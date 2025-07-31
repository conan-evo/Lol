import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatTime, formatDuration, generateId } from '../utils/time';
import { saveTimerSessions, loadTimerSessions } from '../utils/storage';
import { TimerSession } from '../types';

export default function TimerScreen() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState<TimerSession[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date | null>(null);

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const loadSessions = async () => {
    const loadedSessions = await loadTimerSessions();
    setSessions(loadedSessions.slice(-10)); // Keep only last 10 sessions
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      startTimeRef.current = new Date();
    }
  };

  const stopTimer = async () => {
    if (isRunning) {
      setIsRunning(false);
      
      if (seconds > 0 && startTimeRef.current) {
        const newSession: TimerSession = {
          id: generateId(),
          duration: seconds,
          startTime: startTimeRef.current,
          endTime: new Date(),
        };

        const updatedSessions = [...sessions, newSession].slice(-10);
        setSessions(updatedSessions);
        await saveTimerSessions(updatedSessions);
      }
    }
  };

  const resetTimer = () => {
    if (isRunning) {
      Alert.alert(
        'Stop Timer',
        'Are you sure you want to reset the timer? Your current session will be lost.',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Reset', 
            style: 'destructive',
            onPress: () => {
              setIsRunning(false);
              setSeconds(0);
              startTimeRef.current = null;
            }
          },
        ]
      );
    } else {
      setSeconds(0);
    }
  };

  const clearHistory = async () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all timer history?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: async () => {
            setSessions([]);
            await saveTimerSessions([]);
          }
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.timerContainer}>
        <View style={styles.timeDisplay}>
          <Text style={styles.timeText}>{formatTime(seconds)}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={isRunning ? stopTimer : startTimer}
          >
            <Ionicons 
              name={isRunning ? 'pause' : 'play'} 
              size={24} 
              color="white" 
            />
            <Text style={styles.buttonText}>
              {isRunning ? 'Stop' : 'Start'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={resetTimer}
          >
            <Ionicons name="refresh" size={24} color="#007AFF" />
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.historyContainer}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>Recent Sessions</Text>
          {sessions.length > 0 && (
            <TouchableOpacity onPress={clearHistory}>
              <Text style={styles.clearButton}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        {sessions.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="timer-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No sessions yet</Text>
            <Text style={styles.emptySubtext}>Start a timer to see your sessions here</Text>
          </View>
        ) : (
          sessions.slice().reverse().map((session) => (
            <View key={session.id} style={styles.sessionItem}>
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionDuration}>
                  {formatDuration(session.duration)}
                </Text>
                <Text style={styles.sessionTime}>
                  {session.startTime.toLocaleDateString()} at{' '}
                  {session.startTime.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </Text>
              </View>
              <Ionicons name="checkmark-circle" size={20} color="#34C759" />
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  timerContainer: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  timeDisplay: {
    marginBottom: 32,
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1a1a1a',
    fontVariant: ['tabular-nums'],
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
  historyContainer: {
    backgroundColor: 'white',
    margin: 16,
    marginTop: 0,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  clearButton: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  sessionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sessionInfo: {
    flex: 1,
  },
  sessionDuration: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  sessionTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});
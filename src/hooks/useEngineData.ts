import { useState, useEffect, useRef } from "react";
import { 
  SensorData, 
  VehicleStatus, 
  Alert, 
  Prediction, 
  DataMode 
} from "../types.ts";

const INITIAL_DATA: SensorData = {
  temperature: 82,
  vibration: 40,
  oilLevel: 90,
  rpm: 2500,
  rpmStable: true,
  timestamp: Date.now(),
};

export function useEngineData(mode: DataMode = "auto") {
  const [data, setData] = useState<SensorData>(INITIAL_DATA);
  const [history, setHistory] = useState<Alert[]>([]);
  const [activePredictions, setActivePredictions] = useState<Prediction[]>([]);
  const [status, setStatus] = useState<VehicleStatus>(VehicleStatus.HEALTHY);
  
  const lastAlertTime = useRef<number>(0);

  // Simulation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        // Gradually fluctuate values
        const newTemp = Math.max(70, Math.min(115, prev.temperature + (Math.random() - 0.45) * 2));
        const newVibration = Math.max(20, Math.min(105, prev.vibration + (Math.random() - 0.48) * 3));
        const newOil = Math.max(10, Math.min(100, prev.oilLevel - (Math.random() * 0.05))); // Oil slowly decreases
        
        // Randomly simulate RPM spikes or instability
        const isSpiking = Math.random() > 0.95;
        const baseRpm = isSpiking ? prev.rpm * 1.5 : 2500 + (Math.random() - 0.5) * 500;
        const newRpm = Math.max(800, Math.min(7000, baseRpm));
        const newRpmStable = Math.random() > 0.05; // 5% chance of instability

        return {
          temperature: newTemp,
          vibration: newVibration,
          oilLevel: newOil,
          rpm: newRpm,
          rpmStable: newRpmStable,
          timestamp: Date.now(),
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Predictive Logic & Status Updates
  useEffect(() => {
    const predictions: Prediction[] = [];
    const newAlerts: Alert[] = [];
    let currentStatus: VehicleStatus = VehicleStatus.HEALTHY;

    // Temperature checks
    if (data.temperature > 95) {
      currentStatus = VehicleStatus.CRITICAL;
      predictions.push({
        issue: "Engine Overheating",
        severity: "high",
        action: "Check coolant levels and stop vehicle immediately if temp rises further.",
        category: "Engine"
      });
    } else if (data.temperature > 85) {
      currentStatus = VehicleStatus.WARNING;
      predictions.push({
        issue: "High Engine Temperature",
        severity: "medium",
        action: "Monitor temperature and check for radiator obstructions.",
        category: "Engine"
      });
    }

    // Vibration checks
    if (data.vibration > 80) {
      currentStatus = VehicleStatus.CRITICAL;
      predictions.push({
        issue: "Critical Suspension/Engine Issue",
        severity: "high",
        action: "Inspect engine mounts and suspension components for wear.",
        category: "Suspension"
      });
    } else if (data.vibration > 60) {
      if (currentStatus !== (VehicleStatus.CRITICAL as any)) currentStatus = VehicleStatus.WARNING;
      predictions.push({
        issue: "Abnormal Vibration Detected",
        severity: "medium",
        action: "Schedule a suspension check soon.",
        category: "Suspension"
      });
    }

    // Oil checks
    if (data.oilLevel < 30) {
      currentStatus = VehicleStatus.CRITICAL;
      predictions.push({
        issue: "Oil Level Critical",
        severity: "high",
        action: "Refill oil immediately to prevent engine seizure.",
        category: "Oil"
      });
    } else if (data.oilLevel < 50) {
      if (currentStatus !== (VehicleStatus.CRITICAL as any)) currentStatus = VehicleStatus.WARNING;
      predictions.push({
        issue: "Oil Level Low",
        severity: "medium",
        action: "Change oil or top up soon.",
        category: "Oil"
      });
    }

    // RPM stability
    if (!data.rpmStable) {
      if (currentStatus !== (VehicleStatus.CRITICAL as any)) currentStatus = VehicleStatus.WARNING;
      predictions.push({
        issue: "Engine Instability (Unstable RPM)",
        severity: "medium",
        action: "Check spark plugs and fuel injection system.",
        category: "Engine"
      });
    }

    setStatus(currentStatus);
    setActivePredictions(predictions);

    // Alert recording (avoid spamming)
    const now = Date.now();
    if (currentStatus !== VehicleStatus.HEALTHY && now - lastAlertTime.current > 60000) {
      const topIssue = predictions[0];
      if (topIssue) {
        setHistory(prev => [{
          id: Math.random().toString(36).substr(2, 9),
          type: topIssue.category as any,
          message: topIssue.issue,
          severity: topIssue.severity,
          timestamp: now
        }, ...prev.slice(0, 49)]); // Keep last 50
        lastAlertTime.current = now;
      }
    }

  }, [data]);

  return {
    data,
    status,
    activePredictions,
    history,
  };
}

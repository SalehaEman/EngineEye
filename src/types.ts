/**
 * EngineEye Application Types
 */

export enum VehicleStatus {
  HEALTHY = "Healthy",
  WARNING = "Warning",
  CRITICAL = "Critical",
}

export interface SensorData {
  temperature: number;
  vibration: number;
  oilLevel: number;
  rpm: number;
  rpmStable: boolean;
  timestamp: number;
}

export interface Alert {
  id: string;
  type: "Engine" | "Brake" | "Suspension" | "Oil" | "General";
  message: string;
  severity: "low" | "medium" | "high";
  timestamp: number;
}

export interface Prediction {
  issue: string;
  severity: "low" | "medium" | "high";
  action: string;
  category: "Engine" | "Brake" | "Suspension" | "Oil";
}

export type DataMode = "auto" | "simulation";

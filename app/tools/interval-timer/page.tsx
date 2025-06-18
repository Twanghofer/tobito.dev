"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Infinity, Pause, Play, RotateCcw, Save, Settings, StopCircle, Trash2 } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

interface TimerConfig {
  id: string
  name: string
  workDuration: number
  restDuration: number
  rounds: number
  isInfinite: boolean
}

type TimerState = "idle" | "running" | "paused"
type IntervalType = "work" | "rest"

export default function IntervalTimer() {
  // Timer configuration
  const [workDuration, setWorkDuration] = useState(30)
  const [restDuration, setRestDuration] = useState(10)
  const [totalRounds, setTotalRounds] = useState(8)
  const [isInfiniteRounds, setIsInfiniteRounds] = useState(false)

  // Timer state
  const [timerState, setTimerState] = useState<TimerState>("idle")
  const [currentInterval, setCurrentInterval] = useState<IntervalType>("work")
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [currentRound, setCurrentRound] = useState(1)
  const [totalTime, setTotalTime] = useState(0)

  // Configuration management
  const [savedConfigs, setSavedConfigs] = useState<TimerConfig[]>([])
  const [configName, setConfigName] = useState("")
  const [showConfigDialog, setShowConfigDialog] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Load saved configurations on mount and initialize defaults if none exist
  useEffect(() => {
    const saved = localStorage.getItem("interval-timer-configs")
    if (saved) {
      setSavedConfigs(JSON.parse(saved))
    } else {
      // Initialize with default presets on first load
      const defaultPresets: TimerConfig[] = [
        {
          id: "default-tabata",
          name: "Tabata",
          workDuration: 20,
          restDuration: 10,
          rounds: 8,
          isInfinite: false,
        },
        {
          id: "default-hiit",
          name: "HIIT Classic",
          workDuration: 45,
          restDuration: 15,
          rounds: 12,
          isInfinite: false,
        },
        {
          id: "default-balanced",
          name: "Balanced",
          workDuration: 30,
          restDuration: 30,
          rounds: 10,
          isInfinite: false,
        },
        {
          id: "default-endurance",
          name: "Endurance",
          workDuration: 60,
          restDuration: 20,
          rounds: 6,
          isInfinite: false,
        },
        {
          id: "default-infinite",
          name: "Continuous HIIT",
          workDuration: 40,
          restDuration: 20,
          rounds: 1,
          isInfinite: true,
        },
      ]
      setSavedConfigs(defaultPresets)
      localStorage.setItem("interval-timer-configs", JSON.stringify(defaultPresets))
    }

    // Create audio context for beep sounds
    if (typeof window !== "undefined") {
      audioRef.current = new Audio()
    }
  }, [])

  // Calculate total workout time
  useEffect(() => {
    if (isInfiniteRounds) {
      setTotalTime(0) // Infinite time
    } else {
      setTotalTime((workDuration + restDuration) * totalRounds)
    }
  }, [workDuration, restDuration, totalRounds, isInfiniteRounds])

  // Play beep sound
  const playBeep = useCallback((frequency = 800, duration = 200) => {
    if (typeof window !== "undefined" && audioRef.current) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = frequency
      oscillator.type = "sine"

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration / 1000)
    }
  }, [])

  // Timer logic
  useEffect(() => {
    if (timerState === "running") {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Time's up for current interval
            if (currentInterval === "work") {
              // Switch to rest
              setCurrentInterval("rest")
              playBeep(600, 300) // Lower tone for rest
              return restDuration
            } else {
              // Switch to work or end workout (if not infinite)
              if (!isInfiniteRounds && currentRound >= totalRounds) {
                // Workout complete (only for finite rounds)
                setTimerState("idle")
                setCurrentRound(1)
                setCurrentInterval("work")
                playBeep(1000, 500) // High tone for completion
                return workDuration
              } else {
                // Next round (or continue infinitely)
                if (!isInfiniteRounds) {
                  setCurrentRound((r) => r + 1)
                } else {
                  // For infinite rounds, increment but don't stop
                  setCurrentRound((r) => r + 1)
                }
                setCurrentInterval("work")
                playBeep(800, 300) // Standard tone for work
                return workDuration
              }
            }
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [timerState, currentInterval, currentRound, totalRounds, workDuration, restDuration, isInfiniteRounds, playBeep])

  const startTimer = () => {
    if (timerState === "idle") {
      setTimeRemaining(workDuration)
      setCurrentInterval("work")
      setCurrentRound(1)
    }
    setTimerState("running")
    playBeep(800, 200)
  }

  const pauseTimer = () => {
    setTimerState("paused")
  }

  const stopTimer = () => {
    setTimerState("idle")
    setCurrentInterval("work")
    setTimeRemaining(workDuration)
    setCurrentRound(1)
  }

  const resetTimer = () => {
    stopTimer()
  }

  // Configuration management
  const saveConfiguration = () => {
    if (!configName.trim()) return

    const newConfig: TimerConfig = {
      id: Date.now().toString(),
      name: configName,
      workDuration,
      restDuration,
      rounds: totalRounds,
      isInfinite: isInfiniteRounds,
    }

    const updatedConfigs = [...savedConfigs, newConfig]
    setSavedConfigs(updatedConfigs)
    localStorage.setItem("interval-timer-configs", JSON.stringify(updatedConfigs))
    setConfigName("")
    setShowConfigDialog(false)
  }

  const loadConfiguration = (config: TimerConfig) => {
    if (timerState !== "idle") {
      stopTimer()
    }

    setWorkDuration(config.workDuration)
    setRestDuration(config.restDuration)
    setTotalRounds(config.rounds)
    setIsInfiniteRounds(config.isInfinite)
    setTimeRemaining(config.workDuration)
  }

  const deleteConfiguration = (id: string) => {
    const updatedConfigs = savedConfigs.filter((config) => config.id !== id)
    setSavedConfigs(updatedConfigs)
    localStorage.setItem("interval-timer-configs", JSON.stringify(updatedConfigs))
  }

  // Progress calculations
  const currentIntervalDuration = currentInterval === "work" ? workDuration : restDuration
  const intervalProgress = ((currentIntervalDuration - timeRemaining) / currentIntervalDuration) * 100
  const roundProgress = isInfiniteRounds ? 0 : ((currentRound - 1) / totalRounds) * 100

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">Interval Timer</h1>
          <p className="text-muted-foreground">High-intensity interval training made simple</p>
        </div>

        {/* Main Timer Display */}
        <Card
          className={`transition-all duration-500 ${
            timerState === "running"
              ? currentInterval === "work"
                ? "bg-destructive/10 border-destructive/20 shadow-destructive/10"
                : "bg-green-500/10 border-green-500/20 shadow-green-500/10"
              : "bg-card"
          }`}
        >
          <CardHeader className="text-center">
            <CardTitle
              className={`text-6xl font-mono transition-colors ${
                timerState === "running"
                  ? currentInterval === "work"
                    ? "text-destructive"
                    : "text-green-600"
                  : "text-foreground"
              }`}
            >
              {formatTime(timeRemaining)}
            </CardTitle>
            <CardDescription className="text-xl">
              <span className={`font-semibold ${currentInterval === "work" ? "text-destructive" : "text-green-600"}`}>
                {currentInterval === "work" ? "WORK" : "REST"}
              </span>
              {" • "}
              Round {currentRound}{" "}
              {isInfiniteRounds ? (
                <span className="inline-flex items-center">
                  of <Infinity className="w-5 h-5 mx-1" />
                </span>
              ) : (
                `of ${totalRounds}`
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Interval Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Current Interval</span>
                <span>{Math.round(intervalProgress)}%</span>
              </div>
              <Progress
                value={intervalProgress}
                className={`h-3 ${currentInterval === "work" ? "[&>div]:bg-destructive" : "[&>div]:bg-green-500"}`}
              />
            </div>

            {/* Round Progress */}
            {!isInfiniteRounds && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Workout Progress</span>
                  <span>{Math.round(roundProgress)}%</span>
                </div>
                <Progress value={roundProgress} className="h-2" />
              </div>
            )}

            {/* Infinite Rounds Indicator */}
            {isInfiniteRounds && (
              <div className="text-center py-2">
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  <Infinity className="w-4 h-4" />
                  <span>Infinite Rounds Mode</span>
                </div>
              </div>
            )}

            {/* Timer Controls */}
            <div className="flex justify-center gap-4 pt-4">
              {timerState === "idle" && (
                <Button onClick={startTimer} size="lg" className="px-8">
                  <Play className="w-5 h-5 mr-2" />
                  Start
                </Button>
              )}

              {timerState === "running" && (
                <Button onClick={pauseTimer} size="lg" variant="outline" className="px-8">
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </Button>
              )}

              {timerState === "paused" && (
                <>
                  <Button onClick={startTimer} size="lg" className="px-6">
                    <Play className="w-5 h-5 mr-2" />
                    Resume
                  </Button>
                  <Button onClick={stopTimer} size="lg" variant="outline" className="px-6">
                    <StopCircle className="w-5 h-5 mr-2" />
                    Stop
                  </Button>
                </>
              )}

              {timerState !== "idle" && (
                <Button onClick={resetTimer} size="lg" variant="destructive" className="px-6">
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Configuration Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Timer Configuration
              </CardTitle>
              <CardDescription>Customize your workout intervals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="work-duration">Work Duration (seconds)</Label>
                  <Input
                    id="work-duration"
                    type="number"
                    value={workDuration}
                    onChange={(e) => setWorkDuration(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    disabled={timerState !== "idle"}
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rest-duration">Rest Duration (seconds)</Label>
                  <Input
                    id="rest-duration"
                    type="number"
                    value={restDuration}
                    onChange={(e) => setRestDuration(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    disabled={timerState !== "idle"}
                    min="1"
                  />
                </div>
              </div>

              {/* Rounds Configuration */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="infinite-rounds"
                    checked={isInfiniteRounds}
                    onCheckedChange={(checked) => setIsInfiniteRounds(checked as boolean)}
                    disabled={timerState !== "idle"}
                  />
                  <Label htmlFor="infinite-rounds" className="flex items-center gap-2">
                    <Infinity className="w-4 h-4" />
                    Infinite Rounds
                  </Label>
                </div>

                {!isInfiniteRounds && (
                  <div className="space-y-2">
                    <Label htmlFor="rounds">Number of Rounds</Label>
                    <Input
                      id="rounds"
                      type="number"
                      value={totalRounds}
                      onChange={(e) => setTotalRounds(Math.max(1, Number.parseInt(e.target.value) || 1))}
                      disabled={timerState !== "idle"}
                      min="1"
                    />
                  </div>
                )}
              </div>

              <Separator />

              <div className="text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Total workout time:</span>
                  <span className="font-medium">
                    {isInfiniteRounds ? (
                      <span className="inline-flex items-center gap-1">
                        <Infinity className="w-4 h-4" />
                      </span>
                    ) : (
                      formatTime(totalTime)
                    )}
                  </span>
                </div>
              </div>

              {/* Configuration Management */}
              <div className="flex gap-2 pt-2">
                <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Save Current Configuration
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Save Configuration</DialogTitle>
                      <DialogDescription>
                        Give your timer configuration a name to save it as a quick preset.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="config-name">Configuration Name</Label>
                        <Input
                          id="config-name"
                          value={configName}
                          onChange={(e) => setConfigName(e.target.value)}
                          placeholder="e.g., My HIIT Workout, Boxing Rounds, etc."
                        />
                      </div>
                      <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                        <div className="font-medium mb-1">Current Configuration:</div>
                        <div>
                          Work: {workDuration}s • Rest: {restDuration}s • Rounds:{" "}
                          {isInfiniteRounds ? (
                            <span className="inline-flex items-center gap-1">
                              <Infinity className="w-3 h-3" />
                            </span>
                          ) : (
                            totalRounds
                          )}
                        </div>
                        <div>
                          Total time:{" "}
                          {isInfiniteRounds ? (
                            <span className="inline-flex items-center gap-1">
                              <Infinity className="w-3 h-3" />
                            </span>
                          ) : (
                            formatTime(totalTime)
                          )}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowConfigDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={saveConfiguration} disabled={!configName.trim()}>
                        Save as Preset
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Presets */}
          <Card>
            <CardHeader>
              <CardTitle>Presets</CardTitle>
              <CardDescription>
                {savedConfigs.length === 0
                  ? "No saved presets yet. Create your first one!"
                  : "Click to load a preset, or delete ones you don't need"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {savedConfigs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <div className="text-sm">No presets available.</div>
                  <div className="text-xs mt-1">Save your current configuration to create your first preset.</div>
                </div>
              ) : (
                <div className="space-y-2">
                  {savedConfigs.map((config) => (
                    <div key={config.id} className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 justify-start h-auto"
                        onClick={() => loadConfiguration(config)}
                        disabled={timerState !== "idle"}
                      >
                        <div className="text-left">
                          <div className="font-medium flex items-center gap-2">
                            {config.name}
                            {config.isInfinite && <Infinity className="w-4 h-4 text-muted-foreground" />}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {config.workDuration}s work, {config.restDuration}s rest,{" "}
                            {config.isInfinite ? (
                              <span className="inline-flex items-center gap-1">
                                <Infinity className="w-3 h-3" />
                                rounds
                              </span>
                            ) : (
                              `${config.rounds} rounds`
                            )}
                          </div>
                        </div>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteConfiguration(config.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        disabled={timerState !== "idle"}
                        title="Delete preset"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

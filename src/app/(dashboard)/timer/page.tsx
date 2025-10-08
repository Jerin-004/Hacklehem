"use client"

import { StudyTimer } from "@/components/timer/StudyTimer";
import { Clock, Focus, Target, TrendingUp, Brain, Zap } from "lucide-react";

export default function TimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/50">
      {/* Professional Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-700/90" />
        
        <div className="relative p-8 md:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Focus Timer
                  </h1>
                  <p className="text-indigo-100 text-lg mt-2">
                    Master your productivity with smart time management
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Focus className="h-6 w-6 text-white mx-auto mb-2" />
                  <p className="text-sm text-indigo-100">Deep Focus</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Target className="h-6 w-6 text-white mx-auto mb-2" />
                  <p className="text-sm text-indigo-100">Goal Tracking</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Brain className="h-6 w-6 text-white mx-auto mb-2" />
                  <p className="text-sm text-indigo-100">Smart Breaks</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <TrendingUp className="h-6 w-6 text-white mx-auto mb-2" />
                  <p className="text-sm text-indigo-100">Analytics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Timer Content */}
      <div className="relative p-8 -mt-8">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          <StudyTimer />
        </div>
      </div>

      {/* Features Section */}
      <div className="p-8">
        <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg w-fit mx-auto mb-3">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Pomodoro Technique</h3>
              <p className="text-sm text-gray-600">25-minute focused work sessions with strategic breaks</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg w-fit mx-auto mb-3">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Analytics</h3>
              <p className="text-sm text-gray-600">Track your productivity patterns and optimize your workflow</p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg w-fit mx-auto mb-3">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Flow</h3>
              <p className="text-sm text-gray-600">Seamlessly enter deep work mode with ambient sounds</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
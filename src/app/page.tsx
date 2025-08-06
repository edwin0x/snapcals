"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Calculator,
  Zap,
  Target,
  TrendingUp,
  Info,
  Menu,
  User,
  Bell,
  Settings,
  Activity,
  Download,
  Share2,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function CalqCalorieCalculator() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    height: "",
    weight: "",
    activityLevel: "sedentary",
    goal: "maintain",
    weightChangePace: 0.5,
  });

  const [results, setResults] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activityLevels = {
    sedentary: {
      label: "Sedentary",
      multiplier: 1.2,
      description: "Little to no exercise",
    },
    light: {
      label: "Lightly Active",
      multiplier: 1.375,
      description: "Light exercise 1-3 days/week",
    },
    moderate: {
      label: "Moderately Active",
      multiplier: 1.55,
      description: "Moderate exercise 3-5 days/week",
    },
    very: {
      label: "Very Active",
      multiplier: 1.725,
      description: "Hard exercise 6-7 days/week",
    },
    extra: {
      label: "Extra Active",
      multiplier: 1.9,
      description: "Very hard exercise, physical job",
    },
  };

  const goals = {
    lose: {
      label: "Lose Weight",
      description: "Lose weight at your chosen pace",
    },
    maintain: {
      label: "Maintain Weight",
      description: "Stay at current weight",
    },
    gain: {
      label: "Gain Weight",
      description: "Gain weight at your chosen pace",
    },
  };

  const calculateBMR = () => {
    const age = parseInt(formData.age);
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);

    if (!age || !weight || !height) return null;

    const weightKg = unit === "imperial" ? weight * 0.453592 : weight;
    const heightCm = unit === "imperial" ? height * 2.54 : height;

    let bmr;
    if (formData.gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }

    return Math.round(bmr);
  };

  const calculateTDEE = (bmr) => {
    if (!bmr) return null;
    return Math.round(bmr * activityLevels[formData.activityLevel].multiplier);
  };

  const calculateGoalCalories = (tdee) => {
    if (!tdee) return null;

    if (formData.goal === "maintain") {
      return tdee;
    }

    const dailyCalorieAdjustment = formData.weightChangePace * 1100;

    if (formData.goal === "lose") {
      return Math.round(tdee - dailyCalorieAdjustment);
    } else if (formData.goal === "gain") {
      return Math.round(tdee + dailyCalorieAdjustment);
    }

    return tdee;
  };

  const handleCalculate = () => {
    const bmr = calculateBMR();
    if (!bmr) return;

    const tdee = calculateTDEE(bmr);
    const goalCalories = calculateGoalCalories(tdee);

    setResults({
      bmr,
      tdee,
      goalCalories,
      macros: {
        protein: Math.round((goalCalories * 0.25) / 4),
        carbs: Math.round((goalCalories * 0.45) / 4),
        fat: Math.round((goalCalories * 0.3) / 9),
      },
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaceChange = (value) => {
    setFormData((prev) => ({ ...prev, weightChangePace: value[0] }));
  };

  const isFormValid = formData.age && formData.weight && formData.height;

  const getPaceDescription = () => {
    if (formData.goal === "maintain") return "";

    const paceKg = formData.weightChangePace;
    const paceLbs = (paceKg * 2.20462).toFixed(1);
    const goalText = formData.goal === "lose" ? "Lose" : "Gain";

    return `${goalText} ${paceKg}kg (${paceLbs}lbs) per week`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                    <Activity className="h-5 w-5 text-black font-bold" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    Calq
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a
                  href="#"
                  className="text-emerald-400 hover:text-emerald-300 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Nutrition
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Workouts
                </a>
                <a
                  href="#"
                  className="text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                >
                  Calculator
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Progress
                </a>
              </div>
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-emerald-400"
              >
                <Bell className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-emerald-400"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-emerald-400"
              >
                <User className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-400 hover:text-emerald-400"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-800">
                <a
                  href="#"
                  className="text-emerald-400 block px-3 py-2 text-base font-medium"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-emerald-400 block px-3 py-2 text-base font-medium"
                >
                  Nutrition
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-emerald-400 block px-3 py-2 text-base font-medium"
                >
                  Workouts
                </a>
                <a
                  href="#"
                  className="text-white bg-emerald-600 block px-3 py-2 text-base font-medium rounded-lg"
                >
                  Calculator
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-emerald-400 block px-3 py-2 text-base font-medium"
                >
                  Progress
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center space-x-2 bg-gray-900 rounded-full px-4 py-2 border border-gray-800">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-400 text-sm font-medium">
                AI-Powered Nutrition
              </span>
            </div>
            <h1 className="text-5xl font-bold">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Precision Calorie
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get personalized daily calorie targets and macronutrient
              breakdowns based on your unique goals and lifestyle
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Input Form */}
            <Card className="bg-gray-900 border-gray-800 shadow-2xl">
              <CardHeader className="border-b border-gray-800">
                <CardTitle className="flex items-center gap-2 text-white">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                    <Target className="h-4 w-4 text-black" />
                  </div>
                  Your Profile
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Tell us about yourself for precise calculations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {/* Unit Selection */}
                <div className="space-y-3">
                  <Label className="text-gray-200">Measurement System</Label>
                  <RadioGroup
                    value={unit}
                    onValueChange={setUnit}
                    className="flex gap-8"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="metric"
                        id="metric"
                        className="border-gray-600 text-emerald-400"
                      />
                      <Label htmlFor="metric" className="text-gray-300">
                        Metric (kg, cm)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="imperial"
                        id="imperial"
                        className="border-gray-600 text-emerald-400"
                      />
                      <Label htmlFor="imperial" className="text-gray-300">
                        Imperial (lbs, in)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator className="bg-gray-800" />

                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-gray-200">
                      Age
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      min="15"
                      max="80"
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-200">Gender</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) =>
                        handleInputChange("gender", value)
                      }
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="male"
                          id="male"
                          className="border-gray-600 text-emerald-400"
                        />
                        <Label htmlFor="male" className="text-gray-300">
                          Male
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="female"
                          id="female"
                          className="border-gray-600 text-emerald-400"
                        />
                        <Label htmlFor="female" className="text-gray-300">
                          Female
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-gray-200">
                      Height ({unit === "metric" ? "cm" : "inches"})
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder={unit === "metric" ? "170" : "67"}
                      value={formData.height}
                      onChange={(e) =>
                        handleInputChange("height", e.target.value)
                      }
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-gray-200">
                      Weight ({unit === "metric" ? "kg" : "lbs"})
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder={unit === "metric" ? "70" : "154"}
                      value={formData.weight}
                      onChange={(e) =>
                        handleInputChange("weight", e.target.value)
                      }
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-400"
                    />
                  </div>
                </div>

                {/* Activity Level */}
                <div className="space-y-2">
                  <Label className="text-gray-200">Activity Level</Label>
                  <Select
                    value={formData.activityLevel}
                    onValueChange={(value) =>
                      handleInputChange("activityLevel", value)
                    }
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white h-auto py-7">
                      <SelectValue className="text-left">
                        <div className="flex flex-col items-start">
                          <div className="font-medium text-white">
                            {activityLevels[formData.activityLevel]?.label}
                          </div>
                          <div className="text-sm text-gray-400">
                            {
                              activityLevels[formData.activityLevel]
                                ?.description
                            }
                          </div>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {Object.entries(activityLevels).map(([key, level]) => (
                        <SelectItem
                          key={key}
                          value={key}
                          className="text-white hover:bg-gray-700 py-3"
                        >
                          <div className="flex flex-col items-start">
                            <div className="font-medium">{level.label}</div>
                            <div className="text-sm text-gray-400">
                              {level.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Goal */}
                <div className="space-y-2">
                  <Label className="text-gray-200">Goal</Label>
                  <Select
                    value={formData.goal}
                    onValueChange={(value) => handleInputChange("goal", value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white py-7">
                      <SelectValue className="text-left h-20">
                        <div className="flex flex-col items-start">
                          <div className="font-medium text-white">
                            {goals[formData.goal]?.label}
                          </div>
                          <div className="text-sm text-gray-400">
                            {goals[formData.goal]?.description}
                          </div>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {Object.entries(goals).map(([key, goal]) => (
                        <SelectItem
                          key={key}
                          value={key}
                          className="text-white hover:bg-gray-700 py-3"
                        >
                          <div className="flex flex-col items-start">
                            <div className="font-medium">{goal.label}</div>
                            <div className="text-sm text-gray-400">
                              {goal.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Weight Change Pace */}
                {formData.goal !== "maintain" && (
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-gray-200">
                        Weight Change Pace
                      </Label>
                      <div className="px-3">
                        <Slider
                          value={[formData.weightChangePace]}
                          onValueChange={handlePaceChange}
                          max={1.0}
                          min={0.25}
                          step={0.25}
                          className="w-full"
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>0.25kg/week</span>
                        <span className="font-medium text-emerald-400">
                          {getPaceDescription()}
                        </span>
                        <span>1kg/week</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 bg-gray-800 p-3 rounded-lg border border-gray-700">
                      <strong className="text-emerald-400">Recommended:</strong>{" "}
                      0.5kg (1.1lbs) per week is generally considered safe and
                      sustainable for long-term success.
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleCalculate}
                  disabled={!isFormValid}
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-black font-semibold py-6 text-lg transition-all duration-200 transform hover:scale-[1.02]"
                  size="lg"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate My Targets
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {results ? (
                <>
                  {/* Main Results */}
                  <Card className="bg-gray-900 border-gray-800 shadow-2xl">
                    <CardHeader className="border-b border-gray-800">
                      <CardTitle className="flex items-center gap-2 text-white">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                          <Zap className="h-4 w-4 text-black" />
                        </div>
                        Your Targets
                      </CardTitle>
                      {formData.goal !== "maintain" && (
                        <CardDescription className="text-emerald-400">
                          Target: {getPaceDescription()}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                      <div className="grid gap-4">
                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-900/50 to-blue-800/50 rounded-xl border border-blue-700/50">
                          <div>
                            <span className="font-semibold text-white">
                              BMR
                            </span>
                            <div className="text-xs text-gray-400">
                              Base Metabolic Rate
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-blue-600 text-white text-lg px-3 py-1"
                          >
                            {results.bmr}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-900/50 to-green-800/50 rounded-xl border border-green-700/50">
                          <div>
                            <span className="font-semibold text-white">
                              TDEE
                            </span>
                            <div className="text-xs text-gray-400">
                              Total Daily Energy
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-green-600 text-white text-lg px-3 py-1"
                          >
                            {results.tdee}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-900/50 to-cyan-800/50 rounded-xl border border-emerald-700/50">
                          <div>
                            <span className="font-semibold text-white">
                              Goal Calories
                            </span>
                            <div className="text-xs text-gray-400">
                              Daily Target
                            </div>
                          </div>
                          <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black text-lg px-3 py-1 font-bold">
                            {results.goalCalories}
                          </Badge>
                        </div>
                        {formData.goal !== "maintain" && (
                          <div className="text-sm text-gray-400 bg-gray-800 p-3 rounded-lg border border-gray-700">
                            <strong className="text-emerald-400">
                              Daily{" "}
                              {formData.goal === "lose" ? "deficit" : "surplus"}
                              :
                            </strong>{" "}
                            {Math.abs(results.tdee - results.goalCalories)}{" "}
                            calories
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Macronutrients */}
                  <Card className="bg-gray-900 border-gray-800 shadow-2xl">
                    <CardHeader className="border-b border-gray-800">
                      <CardTitle className="flex items-center gap-2 text-white">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-black" />
                        </div>
                        Macro Targets
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Optimized macronutrient distribution
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid gap-4">
                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-900/50 to-red-800/50 rounded-xl border border-red-700/50">
                          <div>
                            <span className="font-semibold text-white">
                              Protein
                            </span>
                            <div className="text-xs text-gray-400">
                              25% of calories • 4 cal/g
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="border-red-500 text-red-400 text-lg px-3 py-1"
                          >
                            {results.macros.protein}g
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 rounded-xl border border-yellow-700/50">
                          <div>
                            <span className="font-semibold text-white">
                              Carbs
                            </span>
                            <div className="text-xs text-gray-400">
                              45% of calories • 4 cal/g
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="border-yellow-500 text-yellow-400 text-lg px-3 py-1"
                          >
                            {results.macros.carbs}g
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-900/50 to-orange-800/50 rounded-xl border border-orange-700/50">
                          <div>
                            <span className="font-semibold text-white">
                              Fat
                            </span>
                            <div className="text-xs text-gray-400">
                              30% of calories • 9 cal/g
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="border-orange-500 text-orange-400 text-lg px-3 py-1"
                          >
                            {results.macros.fat}g
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </>
              ) : (
                <Card className="bg-gray-900 border-gray-800 shadow-2xl">
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Calculator className="h-10 w-10 text-black" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Ready to Calculate
                    </h3>
                    <p className="text-gray-400">
                      Complete your profile to get personalized calorie and
                      macro targets
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Info Card */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Info className="h-4 w-4 text-blue-400" />
                    How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-400 space-y-3 p-6">
                  <p>
                    <strong className="text-emerald-400">BMR</strong> calculated
                    using the Mifflin-St Jeor equation - the gold standard for
                    metabolic rate estimation.
                  </p>
                  <p>
                    <strong className="text-emerald-400">TDEE</strong> factors
                    in your activity level to determine total daily energy
                    needs.
                  </p>
                  <p>
                    <strong className="text-emerald-400">Goal calories</strong>{" "}
                    use the scientifically-backed 7,700 calorie rule: 1kg body
                    weight ≈ 7,700 calories.
                  </p>
                  {formData.goal !== "maintain" && (
                    <p className="text-yellow-400">
                      <strong>Safety:</strong> Very low calorie diets (&lt;1200
                      cal/day for women, &lt;1500 for men) should be medically
                      supervised.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                  <Activity className="h-5 w-5 text-black font-bold" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Calq
                </span>
              </div>
              <p className="text-gray-400 text-sm max-w-xs">
                AI-powered nutrition and fitness platform helping you achieve
                sustainable health goals.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Nutrition Tracking
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Workout Plans
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Progress Analytics
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    AI Coach
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Mobile App
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Getting Started
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Nutrition Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Workout Library
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Success Stories
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-emerald-400" />
                  <span>support@calq.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-emerald-400" />
                  <span>1-800-NOOM-APP</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-emerald-400" />
                  <span>San Francisco, CA</span>
                </li>
              </ul>
              <div className="mt-6">
                <h4 className="text-white font-medium mb-2">Download App</h4>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                  >
                    App Store
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                  >
                    Google Play
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-800 my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 Calq, Inc. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

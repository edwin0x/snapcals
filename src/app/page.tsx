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
import { Calculator, Zap, Target, TrendingUp, Info } from "lucide-react";

export default function CalorieCalculator() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    height: "",
    weight: "",
    activityLevel: "sedentary",
    goal: "maintain",
  });

  const [results, setResults] = useState(null);
  const [unit, setUnit] = useState("metric");

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
      adjustment: -500,
      description: "Lose 1 lb per week",
    },
    maintain: {
      label: "Maintain Weight",
      adjustment: 0,
      description: "Stay at current weight",
    },
    gain: {
      label: "Gain Weight",
      adjustment: 500,
      description: "Gain 1 lb per week",
    },
  };

  const calculateBMR = () => {
    const age = parseInt(formData.age);
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);

    if (!age || !weight || !height) return null;

    // Convert to metric if needed
    const weightKg = unit === "imperial" ? weight * 0.453592 : weight;
    const heightCm = unit === "imperial" ? height * 2.54 : height;

    // Mifflin-St Jeor Equation
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
    return Math.round(tdee + goals[formData.goal].adjustment);
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
        protein: Math.round((goalCalories * 0.25) / 4), // 25% protein
        carbs: Math.round((goalCalories * 0.45) / 4), // 45% carbs
        fat: Math.round((goalCalories * 0.3) / 9), // 30% fat
      },
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.age && formData.weight && formData.height;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <Calculator className="h-8 w-8 text-blue-600" />
            Calorie Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Calculate your daily calorie needs and macronutrient breakdown
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Your Information
              </CardTitle>
              <CardDescription>
                Enter your details to calculate your daily calorie needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Unit Selection */}
              <div className="space-y-2">
                <Label>Units</Label>
                <RadioGroup
                  value={unit}
                  onValueChange={setUnit}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="metric" id="metric" />
                    <Label htmlFor="metric">Metric (kg, cm)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="imperial" id="imperial" />
                    <Label htmlFor="imperial">Imperial (lbs, in)</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    min="15"
                    max="80"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={(value) =>
                      handleInputChange("gender", value)
                    }
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">
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
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">
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
                  />
                </div>
              </div>

              {/* Activity Level */}
              <div className="space-y-2">
                <Label>Activity Level</Label>
                <Select
                  value={formData.activityLevel}
                  onValueChange={(value) =>
                    handleInputChange("activityLevel", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(activityLevels).map(([key, level]) => (
                      <SelectItem key={key} value={key}>
                        <div>
                          <div className="font-medium">{level.label}</div>
                          <div className="text-sm text-gray-500">
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
                <Label>Goal</Label>
                <Select
                  value={formData.goal}
                  onValueChange={(value) => handleInputChange("goal", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(goals).map(([key, goal]) => (
                      <SelectItem key={key} value={key}>
                        <div>
                          <div className="font-medium">{goal.label}</div>
                          <div className="text-sm text-gray-500">
                            {goal.description}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleCalculate}
                disabled={!isFormValid}
                className="w-full"
                size="lg"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Calories
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-4">
            {results ? (
              <>
                {/* Main Results */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-600" />
                      Your Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">
                          BMR (Base Metabolic Rate)
                        </span>
                        <Badge variant="secondary" className="text-lg">
                          {results.bmr} cal/day
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">
                          TDEE (Total Daily Energy)
                        </span>
                        <Badge variant="secondary" className="text-lg">
                          {results.tdee} cal/day
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium">Goal Calories</span>
                        <Badge className="text-lg">
                          {results.goalCalories} cal/day
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Macronutrients */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      Macronutrient Breakdown
                    </CardTitle>
                    <CardDescription>
                      Recommended daily macronutrient intake
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <div>
                          <span className="font-medium">Protein</span>
                          <div className="text-sm text-gray-500">
                            25% of calories
                          </div>
                        </div>
                        <Badge variant="outline" className="text-lg">
                          {results.macros.protein}g
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <div>
                          <span className="font-medium">Carbohydrates</span>
                          <div className="text-sm text-gray-500">
                            45% of calories
                          </div>
                        </div>
                        <Badge variant="outline" className="text-lg">
                          {results.macros.carbs}g
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <div>
                          <span className="font-medium">Fat</span>
                          <div className="text-sm text-gray-500">
                            30% of calories
                          </div>
                        </div>
                        <Badge variant="outline" className="text-lg">
                          {results.macros.fat}g
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Information */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-blue-600" />
                      About These Calculations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-600 space-y-2">
                    <p>
                      <strong>BMR</strong> is calculated using the Mifflin-St
                      Jeor equation, which is considered the most accurate
                      formula for most people.
                    </p>
                    <p>
                      <strong>TDEE</strong> multiplies your BMR by your activity
                      level to estimate total daily energy expenditure.
                    </p>
                    <p>
                      <strong>Goal calories</strong> adjusts TDEE based on your
                      weight goal: -500 cal/day for weight loss, +500 cal/day
                      for weight gain.
                    </p>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-lg">
                <CardContent className="p-8 text-center text-gray-500">
                  <Calculator className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">
                    Ready to Calculate
                  </h3>
                  <p>
                    Fill in your information and click &quot;Calculate
                    Calories&quot; to see your results.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

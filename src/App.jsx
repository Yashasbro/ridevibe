import React, { useState, useEffect } from 'react';
import { MapPin, Fuel, Wrench, Coffee, Hotel, AlertTriangle, Cloud, Users, Book, Settings, Menu, X, Star, TrendingUp, Navigation, Phone, Camera, Calendar, Plus, Search, Filter, Send, DollarSign, CheckSquare, MessageSquare, Wind, Droplets, Eye, BarChart3, ArrowRight } from 'lucide-react';

const RideVibeComplete = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState('routes');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Data States
  const [routes, setRoutes] = useState([]);
  const [services, setServices] = useState([]);
  const [maintenanceLog, setMaintenanceLog] = useState([]);
  const [groupRides, setGroupRides] = useState([]);
  const [routeMemories, setRouteMemories] = useState([]);
  
  // Modal States
  const [showAddRoute, setShowAddRoute] = useState(false);
  const [showAddService, setShowAddService] = useState(false);
  const [showAddMemory, setShowAddMemory] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  
  // Feature States
  const [ridingDuration, setRidingDuration] = useState(0);
  const [fatigueLevel, setFatigueLevel] = useState(0);
  const [weatherLocation, setWeatherLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [sentimentResult, setSentimentResult] = useState(null);
  const [analyzingReview, setAnalyzingReview] = useState(false);
  
  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterServiceType, setFilterServiceType] = useState('all');
  const [compareRoutes, setCompareRoutes] = useState([]);

  // Initialize data on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const routesData = await window.storage.get('routes');
      const servicesData = await window.storage.get('services');
      const maintenanceData = await window.storage.get('maintenance');
      const groupRidesData = await window.storage.get('groupRides');
      const memoriesData = await window.storage.get('memories');
      
      if (routesData) setRoutes(JSON.parse(routesData.value));
      if (servicesData) setServices(JSON.parse(servicesData.value));
      if (maintenanceData) setMaintenanceLog(JSON.parse(maintenanceData.value));
      if (groupRidesData) setGroupRides(JSON.parse(groupRidesData.value));
      if (memoriesData) setRouteMemories(JSON.parse(memoriesData.value));
    } catch (error) {
      await initializeSampleData();
    }
  };

  const initializeSampleData = async () => {
    const sampleRoutes = [
      {
        id: 1,
        name: "Mumbai to Lonavala",
        distance: 83,
        overallScore: 4.2,
        reviewCount: 487,
        scenicBeauty: 4.5,
        roadQuality: 4.0,
        safety: 4.3,
        twistiness: 3.8,
        bestFor: "Weekend riders, Cruisers",
        bestSeason: "October to February",
        difficulty: "Easy",
        description: "Classic monsoon getaway with lush hills and waterfalls"
      },
      {
        id: 2,
        name: "Chennai to Mahabalipuram",
        distance: 54,
        overallScore: 4.6,
        reviewCount: 892,
        scenicBeauty: 4.8,
        roadQuality: 4.5,
        safety: 4.2,
        twistiness: 2.5,
        bestFor: "Coastal rides, Photography",
        bestSeason: "November to March",
        difficulty: "Easy",
        description: "Stunning coastal highway with beach views"
      },
      {
        id: 3,
        name: "Manali to Leh",
        distance: 479,
        overallScore: 4.9,
        reviewCount: 2341,
        scenicBeauty: 5.0,
        roadQuality: 3.2,
        safety: 3.5,
        twistiness: 4.8,
        bestFor: "Adventure tourers, Experienced",
        bestSeason: "June to September",
        difficulty: "Expert",
        description: "Ultimate Himalayan adventure with high passes"
      }
    ];

    const sampleServices = [
      {
        id: 1,
        name: "Shell Petrol Pump - Highway",
        type: "fuel",
        open24Hours: true,
        rating: 4.3,
        reviews: 156,
        amenities: ["Clean washrooms", "Air pump", "ATM"]
      },
      {
        id: 2,
        name: "Bike Master Service Center",
        type: "mechanic",
        open24Hours: false,
        rating: 4.7,
        reviews: 89,
        amenities: ["Multi-brand", "Spare parts", "Emergency"]
      },
      {
        id: 3,
        name: "Rider's Cafe",
        type: "food",
        open24Hours: false,
        rating: 4.5,
        reviews: 234,
        amenities: ["Bike parking", "WiFi", "Helmet storage"]
      }
    ];

    await window.storage.set('routes', JSON.stringify(sampleRoutes));
    await window.storage.set('services', JSON.stringify(sampleServices));
    setRoutes(sampleRoutes);
    setServices(sampleServices);
  };

  // AI Sentiment Analysis
  const analyzeReviewSentiment = async (text) => {
    if (!text.trim()) return;
    
    setAnalyzingReview(true);
    setSentimentResult(null);

    // Simulate AI analysis (replace with real API)
    setTimeout(() => {
      const positiveWords = ['amazing', 'great', 'beautiful', 'excellent', 'perfect', 'love', 'awesome', 'stunning', 'fantastic', 'wonderful', 'incredible', 'best', 'smooth', 'scenic'];
      const negativeWords = ['bad', 'terrible', 'awful', 'poor', 'dangerous', 'worst', 'horrible', 'disappointing', 'rough', 'difficult'];
      
      const lowerText = text.toLowerCase();
      let positiveCount = 0;
      let negativeCount = 0;
      
      positiveWords.forEach(word => {
        if (lowerText.includes(word)) positiveCount++;
      });
      
      negativeWords.forEach(word => {
        if (lowerText.includes(word)) negativeCount++;
      });
      
      const totalSentimentWords = positiveCount + negativeCount;
      const positivePercent = totalSentimentWords > 0 ? (positiveCount / totalSentimentWords) * 100 : 50;
      const negativePercent = totalSentimentWords > 0 ? (negativeCount / totalSentimentWords) * 100 : 20;
      const neutralPercent = 100 - positivePercent - negativePercent;
      
      const overallScore = 1 + (positivePercent / 100) * 4;
      
      setSentimentResult({
        overallScore: overallScore.toFixed(1),
        positive: positivePercent.toFixed(1),
        neutral: neutralPercent.toFixed(1),
        negative: negativePercent.toFixed(1),
        dominantSentiment: positivePercent > 50 ? 'Positive' : negativePercent > 30 ? 'Negative' : 'Neutral',
        isDemo: true
      });
      
      setAnalyzingReview(false);
    }, 1500);
  };

  // Weather Fetch
  const fetchWeather = async (location) => {
    if (!location.trim()) return;
    
    // Demo weather data
    const weatherConditions = ['Clear', 'Cloudy', 'Rainy', 'Sunny'];
    const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    const temp = Math.floor(Math.random() * 15) + 20;
    const windSpeed = Math.floor(Math.random() * 30) + 5;
    
    let safetyScore = 100;
    if (randomCondition === 'Rainy') safetyScore -= 40;
    if (windSpeed > 25) safetyScore -= 20;
    if (temp > 38 || temp < 10) safetyScore -= 20;
    
    setWeatherData({
      temp: temp,
      feelsLike: temp + 3,
      condition: randomCondition,
      description: randomCondition.toLowerCase() + ' sky',
      windSpeed: windSpeed,
      humidity: Math.floor(Math.random() * 40) + 40,
      visibility: 10,
      rain: randomCondition === 'Rainy' ? 5 : 0,
      safetyScore: Math.max(20, safetyScore),
      safetyLevel: safetyScore > 70 ? 'Safe' : safetyScore > 40 ? 'Caution' : 'Unsafe',
      location: location,
      isDemo: true
    });
  };

  // Fatigue Calculation
  useEffect(() => {
    let score = 0;
    if (ridingDuration > 4) score += 40;
    else if (ridingDuration > 2) score += 20;
    
    const hour = new Date().getHours();
    if (hour >= 12 && hour <= 16) score += 20;
    if (hour >= 22 || hour <= 5) score += 30;
    
    setFatigueLevel(Math.min(100, score));
  }, [ridingDuration]);

  // Add Route
  const addNewRoute = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    const newRoute = {
      id: Date.now(),
      name: form.routeName.value,
      distance: parseInt(form.distance.value),
      difficulty: form.difficulty.value,
      description: form.description.value,
      bestFor: form.bestFor.value,
      bestSeason: form.season.value,
      scenicBeauty: parseFloat(form.scenic.value) || 3,
      roadQuality: parseFloat(form.road.value) || 3,
      safety: parseFloat(form.safety.value) || 3,
      twistiness: parseFloat(form.twisty.value) || 3,
      overallScore: 0,
      reviewCount: 0
    };
    
    const updatedRoutes = [...routes, newRoute];
    setRoutes(updatedRoutes);
    await window.storage.set('routes', JSON.stringify(updatedRoutes));
    setShowAddRoute(false);
    form.reset();
  };

  // Add Service
  const addNewService = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    const newService = {
      id: Date.now(),
      name: form.serviceName.value,
      type: form.serviceType.value,
      open24Hours: form.open24.checked,
      rating: 0,
      reviews: 0,
      amenities: form.amenities.value.split(',').map(a => a.trim())
    };
    
    const updatedServices = [...services, newService];
    setServices(updatedServices);
    await window.storage.set('services', JSON.stringify(updatedServices));
    setShowAddService(false);
    form.reset();
  };

  // Add Maintenance
  const addMaintenanceRecord = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    const newRecord = {
      id: Date.now(),
      odometer: parseInt(form.odometer.value),
      type: form.serviceType.value,
      cost: parseFloat(form.cost.value) || 0,
      notes: form.notes.value,
      date: new Date().toISOString()
    };
    
    const updatedLog = [...maintenanceLog, newRecord];
    setMaintenanceLog(updatedLog);
    await window.storage.set('maintenance', JSON.stringify(updatedLog));
    form.reset();
  };

  // Add Memory
  const addRouteMemory = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    const newMemory = {
      id: Date.now(),
      routeId: parseInt(form.routeId.value),
      date: form.date.value,
      rating: parseInt(form.rating.value),
      notes: form.notes.value,
      tags: form.tags.value.split(',').map(t => t.trim()),
      wouldRideAgain: form.rideAgain.checked
    };
    
    const updatedMemories = [...routeMemories, newMemory];
    setRouteMemories(updatedMemories);
    await window.storage.set('memories', JSON.stringify(updatedMemories));
    setShowAddMemory(false);
    form.reset();
  };

  // Create Group Ride
  const createGroupRide = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    const newRide = {
      id: Date.now(),
      name: form.rideName.value,
      routeId: parseInt(form.routeId.value),
      date: form.date.value,
      departureTime: form.departureTime.value,
      meetingPoint: form.meetingPoint.value,
      organizer: form.organizer.value,
      maxRiders: parseInt(form.maxRiders.value),
      participants: [],
      expenses: [],
      tasks: []
    };
    
    const updatedRides = [...groupRides, newRide];
    setGroupRides(updatedRides);
    await window.storage.set('groupRides', JSON.stringify(updatedRides));
    setShowCreateGroup(false);
    form.reset();
  };

  // Filter routes
  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'all' || route.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  // Filter services
  const filteredServices = services.filter(service => {
    return filterServiceType === 'all' || service.type === filterServiceType;
  });

  // Service icons
  const getServiceIcon = (type) => {
    switch(type) {
      case 'fuel': return <Fuel className="text-orange-600" />;
      case 'mechanic': return <Wrench className="text-blue-600" />;
      case 'food': return <Coffee className="text-green-600" />;
      case 'accommodation': return <Hotel className="text-purple-600" />;
      default: return <MapPin className="text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Navigation className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">RideVibe</h1>
                <p className="text-xs text-orange-100">100% Free • AI-Powered</p>
              </div>
            </div>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white hover:bg-opacity-20 rounded"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>

            <nav className="hidden md:flex space-x-4 text-sm">
              {['routes', 'ai', 'services', 'weather', 'fatigue', 'maintenance', 'memories', 'group'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded capitalize transition ${activeTab === tab ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 space-y-2">
              {['routes', 'ai', 'services', 'weather', 'fatigue', 'maintenance', 'memories', 'group'].map(tab => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-2 px-3 hover:bg-white hover:bg-opacity-20 rounded capitalize"
                >
                  {tab}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* ROUTES TAB */}
        {activeTab === 'routes' && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                  <MapPin className="text-orange-600" />
                  Route Intelligence
                </h2>
                <p className="text-gray-600 mt-1">AI-analyzed routes from rider reviews</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowComparison(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <BarChart3 className="h-4 w-4" />
                  Compare
                </button>
                <button
                  onClick={() => setShowAddRoute(true)}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Route
                </button>
              </div>
            </div>

            {/* Search & Filter */}
            <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search routes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                  <select
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    <option value="all">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Routes Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRoutes.map(route => (
                <div key={route.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold">{route.name}</h3>
                        <p className="text-sm opacity-90 mt-1">{route.distance} km</p>
                      </div>
                      <div className="bg-white text-orange-600 rounded-lg px-3 py-1 flex items-center font-bold">
                        <Star className="h-4 w-4 fill-current mr-1" />
                        {route.overallScore}
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-gray-700 text-sm mb-3">{route.description}</p>

                    <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Scenic:</span>
                        <span className="font-semibold">{route.scenicBeauty}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Road:</span>
                        <span className="font-semibold">{route.roadQuality}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Safety:</span>
                        <span className="font-semibold">{route.safety}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Twisty:</span>
                        <span className="font-semibold">{route.twistiness}/5</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="bg-blue-50 p-2 rounded">
                        <strong>Best for:</strong> {route.bestFor}
                      </div>
                      <div className="bg-green-50 p-2 rounded">
                        <strong>Season:</strong> {route.bestSeason}
                      </div>
                      <div className={`p-2 rounded font-semibold ${route.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : route.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        Difficulty: {route.difficulty}
                      </div>
                    </div>

                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs text-gray-500">{route.reviewCount} reviews</span>
                      <button
                        onClick={() => {
                          if (compareRoutes.includes(route.id)) {
                            setCompareRoutes(compareRoutes.filter(id => id !== route.id));
                          } else if (compareRoutes.length < 3) {
                            setCompareRoutes([...compareRoutes, route.id]);
                          }
                        }}
                        className={`text-xs px-3 py-1 rounded transition ${compareRoutes.includes(route.id) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      >
                        {compareRoutes.includes(route.id) ? '✓ Selected' : 'Compare'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredRoutes.length === 0 && (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No routes found matching your criteria</p>
              </div>
            )}
          </div>
        )}

        {/* AI SENTIMENT ANALYSIS TAB */}
        {activeTab === 'ai' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <MessageSquare className="text-orange-600" />
              AI Sentiment Analysis
            </h2>
            <p className="text-gray-600 mb-6">Analyze rider reviews with AI to get instant route ratings</p>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Paste Review Text</h3>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Example: Amazing ride! The roads were smooth, scenic views were breathtaking. Perfect weather and found good food stops along the way."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none mb-4"
                rows="5"
              />
              <button
                onClick={() => analyzeReviewSentiment(reviewText)}
                disabled={!reviewText.trim() || analyzingReview}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {analyzingReview ? 'Analyzing...' : 'Analyze with AI'}
              </button>
            </div>

            {sentimentResult && (
              <div className="bg-white border-2 border-purple-200 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="text-green-600" />
                  Analysis Results
                  {sentimentResult.isDemo && <span className="text-sm text-orange-600">(Demo Mode)</span>}
                </h3>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                    <p className="text-sm text-gray-600 mb-2">Route Score</p>
                    <div className="flex items-center">
                      <Star className="h-8 w-8 text-yellow-500 fill-current mr-2" />
                      <span className="text-4xl font-bold text-gray-800">{sentimentResult.overallScore}</span>
                      <span className="text-2xl text-gray-600">/5</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                    <p className="text-sm text-gray-600 mb-2">Sentiment</p>
                    <p className="text-3xl font-bold text-gray-800">{sentimentResult.dominantSentiment}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-green-700">Positive</span>
                      <span className="text-sm font-bold text-green-700">{sentimentResult.positive}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full transition-all" style={{ width: `${sentimentResult.positive}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-yellow-700">Neutral</span>
                      <span className="text-sm font-bold text-yellow-700">{sentimentResult.neutral}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-yellow-500 h-3 rounded-full transition-all" style={{ width: `${sentimentResult.neutral}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-red-700">Negative</span>
                      <span className="text-sm font-bold text-red-700">{sentimentResult.negative}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-red-500 h-3 rounded-full transition-all" style={{ width: `${sentimentResult.negative}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <h4 className="font-semibold text-yellow-900 mb-2">Setup Instructions:</h4>
              <ol className="text-sm text-yellow-800 space-y-1 list-decimal list-inside">
                <li>Currently using demo sentiment analysis</li>
                <li>For real AI: Get free token from huggingface.co</li>
                <li>Replace API call in code with your token</li>
              </ol>
            </div>
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === 'services' && (
          <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                  <MapPin className="text-orange-600" />
                  Biker Services
                </h2>
                <p className="text-gray-600 mt-1">Find fuel, mechanics, food & stays</p>
              </div>
              <button
                onClick={() => setShowAddService(true)}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Service
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex flex-wrap gap-2 mb-6">
                {['all', 'fuel', 'mechanic', 'food', 'accommodation'].map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterServiceType(type)}
                    className={`px-4 py-2 rounded-lg capitalize transition ${filterServiceType === type ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {filteredServices.map(service => (
                  <div key={service.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-400 transition">
                    <div className="flex items-start gap-3">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        {getServiceIcon(service.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{service.name}</h3>
                        <div className="flex items-center mt-1 mb-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                          <span className="text-sm font-semibold">{service.rating}/5</span>
                          <span className="text-xs text-gray-500 ml-2">({service.reviews} reviews)</span>
                        </div>
                        
                        {service.open24Hours && (
                          <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-semibold">
                            24 Hours
                          </span>
                        )}
                        
                        {service.amenities && service.amenities.length > 0 && (
                          <div className="mt-3">
                            <div className="flex flex-wrap gap-1">
                              {service.amenities.map((amenity, idx) => (
                                <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredServices.length === 0 && (
                <div className="text-center py-12">
                  <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No services found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* WEATHER TAB */}
        {activeTab === 'weather' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Cloud className="text-orange-600" />
              Weather Intelligence
            </h2>
            <p className="text-gray-600 mb-6">Biker-specific weather analysis and safety scores</p>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Check Weather</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={weatherLocation}
                  onChange={(e) => setWeatherLocation(e.target.value)}
                  placeholder="Enter city name..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  onClick={() => fetchWeather(weatherLocation)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Check
                </button>
              </div>
            </div>

            {weatherData && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{weatherData.location}</h3>
                      <p className="text-gray-600 capitalize">{weatherData.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-bold text-gray-800">{weatherData.temp}°C</div>
                      <p className="text-sm text-gray-600">Feels like {weatherData.feelsLike}°C</p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${weatherData.safetyLevel === 'Safe' ? 'bg-green-200' : weatherData.safetyLevel === 'Caution' ? 'bg-yellow-200' : 'bg-red-200'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-lg">Ride Safety Score</p>
                        <p className={`text-2xl font-bold ${weatherData.safetyLevel === 'Safe' ? 'text-green-700' : weatherData.safetyLevel === 'Caution' ? 'text-yellow-700' : 'text-red-700'}`}>
                          {weatherData.safetyLevel}
                        </p>
                      </div>
                      <div className="text-4xl font-bold text-gray-800">{weatherData.safetyScore}/100</div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-4">
                    <Wind className="h-8 w-8 text-blue-600 mb-2" />
                    <p className="text-sm text-gray-600">Wind Speed</p>
                    <p className="text-2xl font-bold text-gray-800">{weatherData.windSpeed} km/h</p>
                  </div>

                  <div className="bg-white border-2 border-cyan-200 rounded-lg p-4">
                    <Droplets className="h-8 w-8 text-cyan-600 mb-2" />
                    <p className="text-sm text-gray-600">Humidity</p>
                    <p className="text-2xl font-bold text-gray-800">{weatherData.humidity}%</p>
                  </div>

                  <div className="bg-white border-2 border-purple-200 rounded-lg p-4">
                    <Eye className="h-8 w-8 text-purple-600 mb-2" />
                    <p className="text-sm text-gray-600">Visibility</p>
                    <p className="text-2xl font-bold text-gray-800">{weatherData.visibility} km</p>
                  </div>

                  <div className="bg-white border-2 border-indigo-200 rounded-lg p-4">
                    <Cloud className="h-8 w-8 text-indigo-600 mb-2" />
                    <p className="text-sm text-gray-600">Rain</p>
                    <p className="text-2xl font-bold text-gray-800">{weatherData.rain} mm</p>
                  </div>
                </div>

                {weatherData.isDemo && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                    <p className="text-sm text-yellow-800">
                      <strong>Demo Mode:</strong> Get free API key from openweathermap.org
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* FATIGUE TAB */}
        {activeTab === 'fatigue' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="text-orange-600" />
              Fatigue Intelligence
            </h2>
            <p className="text-gray-600 mb-6">Track riding fatigue to stay safe on long journeys</p>

            <div className={`bg-gradient-to-r ${fatigueLevel < 30 ? 'from-green-50 to-green-100' : fatigueLevel < 60 ? 'from-yellow-50 to-yellow-100' : 'from-red-50 to-red-100'} rounded-xl p-8 mb-6`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800">Fatigue Level</h3>
                <span className={`text-5xl font-bold ${fatigueLevel < 30 ? 'text-green-600' : fatigueLevel < 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {fatigueLevel}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
                <div 
                  className={`h-6 rounded-full transition-all ${fatigueLevel < 30 ? 'bg-green-600' : fatigueLevel < 60 ? 'bg-yellow-600' : 'bg-red-600'}`}
                  style={{ width: `${fatigueLevel}%` }}
                ></div>
              </div>
              <p className={`text-xl font-semibold ${fatigueLevel < 30 ? 'text-green-700' : fatigueLevel < 60 ? 'text-yellow-700' : 'text-red-700'}`}>
                {fatigueLevel < 30 ? '✓ Low risk - Ride safe!' : fatigueLevel < 60 ? '⚠ Moderate - Consider break' : '⛔ HIGH RISK - Stop NOW!'}
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How long have you been riding? (hours)
              </label>
              <input
                type="number"
                value={ridingDuration}
                onChange={(e) => setRidingDuration(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-lg"
                placeholder="Enter hours"
                step="0.5"
              />
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <h4 className="font-semibold text-blue-900 mb-2">Recommendations:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Break every 2 hours (15 minutes)</li>
                <li>• Avoid 12-4 PM summer heat</li>
                <li>• Never ride when fatigue is high</li>
                <li>• Stay hydrated every hour</li>
              </ul>
            </div>
          </div>
        )}

        {/* MAINTENANCE TAB */}
        {activeTab === 'maintenance' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Settings className="text-orange-600" />
              Maintenance Log
            </h2>
            <p className="text-gray-600 mb-6">Track service history and never miss maintenance</p>

            <form onSubmit={addMaintenanceRecord} className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Log New Service</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  name="odometer"
                  type="number"
                  required
                  placeholder="Odometer (km)"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                <select
                  name="serviceType"
                  required
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="">Service type</option>
                  <option value="Oil Change">Oil Change</option>
                  <option value="Chain Lube">Chain Lube</option>
                  <option value="Air Filter">Air Filter</option>
                  <option value="Brake Service">Brake Service</option>
                  <option value="General Service">General Service</option>
                </select>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  name="cost"
                  type="number"
                  placeholder="Cost (₹)"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                <input
                  name="notes"
                  type="text"
                  placeholder="Notes (optional)"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition font-semibold"
              >
                Add Record
              </button>
            </form>

            <div>
              <h3 className="font-bold text-gray-800 mb-4 text-xl">Service History:</h3>
              {maintenanceLog.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-12 text-center">
                  <Settings className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No records yet. Add your first service!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {maintenanceLog.slice().reverse().map(record => (
                    <div key={record.id} className="border-2 border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-800">{record.type}</h4>
                          <p className="text-sm text-gray-600 mt-1">Odometer: {record.odometer.toLocaleString()} km</p>
                          {record.notes && <p className="text-sm text-gray-500 mt-1">{record.notes}</p>}
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            {new Date(record.date).toLocaleDateString()}
                          </p>
                          {record.cost > 0 && (
                            <p className="text-lg font-bold text-orange-600 mt-1">₹{record.cost}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* MEMORIES TAB */}
        {activeTab === 'memories' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                  <Camera className="text-orange-600" />
                  Route Memories
                </h2>
                <p className="text-gray-600 mt-1">Document your riding experiences</p>
              </div>
              <button
                onClick={() => setShowAddMemory(true)}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Memory
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {routeMemories.length === 0 ? (
                <div className="col-span-2 bg-white rounded-lg p-12 text-center">
                  <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No memories yet. Start documenting!</p>
                </div>
              ) : (
                routeMemories.map(memory => {
                  const route = routes.find(r => r.id === memory.routeId);
                  return (
                    <div key={memory.id} className="bg-white border-2 border-gray-200 rounded-lg p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{route?.name || 'Unknown'}</h3>
                          <p className="text-sm text-gray-600">{new Date(memory.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center bg-orange-100 px-3 py-1 rounded">
                          <Star className="h-4 w-4 text-orange-600 fill-current mr-1" />
                          <span className="font-bold text-orange-600">{memory.rating}/5</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 text-sm mb-3">{memory.notes}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {memory.tags.map((tag, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {memory.wouldRideAgain && (
                        <div className="flex items-center text-green-600 text-sm">
                          <CheckSquare className="h-4 w-4 mr-1" />
                          Would ride again
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* GROUP RIDES TAB */}
        {activeTab === 'group' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                  <Users className="text-orange-600" />
                  Group Ride Coordinator
                </h2>
                <p className="text-gray-600 mt-1">Plan rides with your crew</p>
              </div>
              <button
                onClick={() => setShowCreateGroup(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create Ride
              </button>
            </div>

            {groupRides.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <Users className="h-16 w-16 mx-auto text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Group Rides Yet</h3>
                <p className="text-gray-600 mb-6">Create your first group ride</p>
                
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  <div className="bg-white border-2 border-purple-200 rounded-lg p-4">
                    <Calendar className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                    <h4 className="font-semibold text-gray-800">Shared Itinerary</h4>
                  </div>
                  <div className="bg-white border-2 border-blue-200 rounded-lg p-4">
                    <CheckSquare className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                    <h4 className="font-semibold text-gray-800">Task Assignment</h4>
                  </div>
                  <div className="bg-white border-2 border-green-200 rounded-lg p-4">
                    <DollarSign className="h-8 w-8 mx-auto text-green-600 mb-2" />
                    <h4 className="font-semibold text-gray-800">Expense Splitting</h4>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {groupRides.map(ride => {
                  const route = routes.find(r => r.id === ride.routeId);
                  return (
                    <div key={ride.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 text-white">
                        <h3 className="text-xl font-bold">{ride.name}</h3>
                        <p className="text-sm opacity-90">{route?.name || 'Route not found'}</p>
                      </div>
                      
                      <div className="p-5">
                        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                          <div>
                            <p className="text-gray-600">Date</p>
                            <p className="font-semibold">{new Date(ride.date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Time</p>
                            <p className="font-semibold">{ride.departureTime}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-gray-600">Meeting Point</p>
                            <p className="font-semibold">{ride.meetingPoint}</p>
                          </div>
                        </div>
                        
                        <div className="bg-gray-100 rounded p-3">
                          <p className="text-sm text-gray-600">Participants</p>
                          <p className="font-bold text-lg text-gray-800">
                            {ride.participants.length} / {ride.maxRiders}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ADD ROUTE MODAL */}
        {showAddRoute && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full my-8">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 flex justify-between items-center rounded-t-xl">
                <h3 className="text-xl font-bold">Add New Route</h3>
                <button onClick={() => setShowAddRoute(false)} className="hover:bg-white hover:bg-opacity-20 rounded p-1">
                  <X />
                </button>
              </div>
              
              <form onSubmit={addNewRoute} className="p-6">
                <div className="space-y-4">
                  <input name="routeName" required placeholder="Route Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <input name="distance" type="number" required placeholder="Distance (km)" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                    <select name="difficulty" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none">
                      <option value="">Difficulty</option>
                      <option value="Easy">Easy</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                  
                  <textarea name="description" rows="3" placeholder="Description" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"></textarea>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <input name="bestFor" placeholder="Best for" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                    <input name="season" placeholder="Best season" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <input name="scenic" type="number" min="1" max="5" step="0.1" placeholder="Scenic" className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                    <input name="road" type="number" min="1" max="5" step="0.1" placeholder="Road" className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                    <input name="safety" type="number" min="1" max="5" step="0.1" placeholder="Safety" className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                    <input name="twisty" type="number" min="1" max="5" step="0.1" placeholder="Twisty" className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button type="submit" className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition font-semibold">
                    Add Route
                  </button>
                  <button type="button" onClick={() => setShowAddRoute(false)} className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ADD SERVICE MODAL */}
        {showAddService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full my-8">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex justify-between items-center rounded-t-xl">
                <h3 className="text-xl font-bold">Add Service</h3>
                <button onClick={() => setShowAddService(false)} className="hover:bg-white hover:bg-opacity-20 rounded p-1">
                  <X />
                </button>
              </div>
              
              <form onSubmit={addNewService} className="p-6">
                <div className="space-y-4">
                  <input name="serviceName" required placeholder="Service Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <select name="serviceType" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option value="">Type</option>
                      <option value="fuel">Fuel</option>
                      <option value="mechanic">Mechanic</option>
                      <option value="food">Food</option>
                      <option value="accommodation">Accommodation</option>
                    </select>
                    <label className="flex items-center">
                      <input name="open24" type="checkbox" className="mr-2 h-5 w-5" />
                      <span className="text-sm font-medium">24 Hours</span>
                    </label>
                  </div>
                  
                  <input name="amenities" placeholder="Amenities (comma-separated)" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button type="submit" className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                    Add Service
                  </button>
                  <button type="button" onClick={() => setShowAddService(false)} className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ADD MEMORY MODAL */}
        {showAddMemory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-4 flex justify-between items-center rounded-t-xl">
                <h3 className="text-xl font-bold">Add Memory</h3>
                <button onClick={() => setShowAddMemory(false)} className="hover:bg-white hover:bg-opacity-20 rounded p-1">
                  <X />
                </button>
              </div>
              
              <form onSubmit={addRouteMemory} className="p-6">
                <div className="space-y-4">
                  <select name="routeId" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none">
                    <option value="">Select Route</option>
                    {routes.map(route => (
                      <option key={route.id} value={route.id}>{route.name}</option>
                    ))}
                  </select>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input name="date" type="date" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none" />
                    <select name="rating" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none">
                      <option value="">Rating</option>
                      <option value="5">5 ⭐⭐⭐⭐⭐</option>
                      <option value="4">4 ⭐⭐⭐⭐</option>
                      <option value="3">3 ⭐⭐⭐</option>
                      <option value="2">2 ⭐⭐</option>
                      <option value="1">1 ⭐</option>
                    </select>
                  </div>
                  
                  <textarea name="notes" rows="4" placeholder="Your experience..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"></textarea>
                  
                  <input name="tags" placeholder="Tags (comma-separated)" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none" />
                  
                  <label className="flex items-center">
                    <input name="rideAgain" type="checkbox" className="mr-2 h-5 w-5" />
                    <span className="text-sm font-medium">Would ride again</span>
                  </label>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button type="submit" className="flex-1 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition font-semibold">
                    Save
                  </button>
                  <button type="button" onClick={() => setShowAddMemory(false)} className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* CREATE GROUP RIDE MODAL */}
        {showCreateGroup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full my-8">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 flex justify-between items-center rounded-t-xl">
                <h3 className="text-xl font-bold">Create Group Ride</h3>
                <button onClick={() => setShowCreateGroup(false)} className="hover:bg-white hover:bg-opacity-20 rounded p-1">
                  <X />
                </button>
              </div>
              
              <form onSubmit={createGroupRide} className="p-6">
                <div className="space-y-4">
                  <input name="rideName" required placeholder="Ride Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                  
                  <select name="routeId" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none">
                    <option value="">Select Route</option>
                    {routes.map(route => (
                      <option key={route.id} value={route.id}>{route.name} ({route.distance} km)</option>
                    ))}
                  </select>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <input name="date" type="date" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                    <input name="departureTime" type="time" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                  </div>
                  
                  <input name="meetingPoint" required placeholder="Meeting Point" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <input name="organizer" required placeholder="Your Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                    <input name="maxRiders" type="number" required min="2" placeholder="Max Riders" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button type="submit" className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold">
                    Create
                  </button>
                  <button type="button" onClick={() => setShowCreateGroup(false)} className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ROUTE COMPARISON MODAL */}
        {showComparison && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full my-8">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex justify-between items-center rounded-t-xl">
                <h3 className="text-xl font-bold">Compare Routes</h3>
                <button onClick={() => setShowComparison(false)} className="hover:bg-white hover:bg-opacity-20 rounded p-1">
                  <X />
                </button>
              </div>
              
              <div className="p-6">
                {compareRoutes.length === 0 ? (
                  <div className="text-center py-12">
                    <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Select up to 3 routes from Routes tab</p>
                    <button onClick={() => setShowComparison(false)} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                      Go Back
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-gray-300">
                          <th className="text-left p-3 font-bold text-gray-700">Aspect</th>
                          {compareRoutes.map(routeId => {
                            const route = routes.find(r => r.id === routeId);
                            return <th key={routeId} className="text-center p-3 font-bold text-gray-700">{route?.name}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {['distance', 'difficulty', 'overallScore', 'scenicBeauty', 'roadQuality', 'safety', 'twistiness', 'bestSeason'].map(aspect => (
                          <tr key={aspect} className="border-b border-gray-200">
                            <td className="p-3 font-semibold text-gray-700 capitalize">{aspect.replace(/([A-Z])/g, ' $1')}</td>
                            {compareRoutes.map(routeId => {
                              const route = routes.find(r => r.id === routeId);
                              const value = route?.[aspect];
                              return (
                                <td key={routeId} className="text-center p-3">
                                  {typeof value === 'number' ? value.toFixed(1) : value || 'N/A'}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">RideVibe - 100% Free Forever</p>
          <p className="text-gray-400 text-sm mb-4">Built by bikers, for bikers. No ads, no paywalls.</p>
          <div className="flex justify-center gap-6 text-sm">
            <button className="hover:text-orange-400 transition">About</button>
            <button className="hover:text-orange-400 transition">Community</button>
            <button className="hover:text-orange-400 transition">Donate</button>
            <button className="hover:text-orange-400 transition">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RideVibeComplete;


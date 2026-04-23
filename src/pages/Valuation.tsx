import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Upload, X } from 'lucide-react';
export function Valuation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    size: '',
    unit: 'sqft',
    bedrooms: '',
    yearBuilt: '',
    condition: '',
    features: [] as string[],
    budget: '',
    documents: [] as File[],
    name: '',
    email: '',
    phone: ''
  });
  const totalSteps = 11;
  // Handle Enter key to advance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && currentStep > 0 && currentStep < totalSteps) {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, formData]);
  const handleNext = () => {
    // Basic validation logic could go here
    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
  };
  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };
  const updateData = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }));
  };
  const toggleFeature = (feature: string) => {
    setFormData((prev) => {
      const exists = prev.features.includes(feature);
      if (exists) {
        return {
          ...prev,
          features: prev.features.filter((f) => f !== feature)
        };
      } else {
        return {
          ...prev,
          features: [...prev.features, feature]
        };
      }
    });
  };
  const slideVariants = {
    enter: {
      y: 50,
      opacity: 0
    },
    center: {
      y: 0,
      opacity: 1
    },
    exit: {
      y: -50,
      opacity: 0
    }
  };

  const FileUploadInput = ({ onFilesSelected }: { onFilesSelected: (files: File[]) => void }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files);
        onFilesSelected(files);
      }
    };

    return (
      <div className="border-2 border-dashed border-gray-medium rounded-xl p-8 cursor-pointer hover:border-gold-primary transition-colors"
        onClick={() => fileInputRef.current?.click()}>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
        />
        <div className="flex flex-col items-center justify-center text-center">
          <Upload className="text-gold-primary mb-4" size={32} />
          <p className="text-white-accent text-lg font-medium mb-2">
            Click to upload documents
          </p>
          <p className="text-gray-light text-sm">
            PDF, Word, Image, or ZIP files (Max 25MB each)
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black-primary flex flex-col overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-primary/10 via-black-primary to-black-primary pointer-events-none"></div>

      {/* Progress Bar */}
      {currentStep > 0 && currentStep < totalSteps &&
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-dark z-10">
          <motion.div
          className="h-full bg-gold-primary"
          initial={{
            width: 0
          }}
          animate={{
            width: `${currentStep / (totalSteps - 1) * 100}%`
          }}
          transition={{
            duration: 0.3
          }} />
        
        </div>
      }

      {/* Header Controls */}
      <div className="relative z-10 p-6 md:p-12 flex justify-between items-center">
        <button
          onClick={() => window.history.back()}
          className="text-white-accent font-serif font-bold text-xl tracking-widest uppercase hover:text-gold-primary transition-colors">
          
          Tempest Gold
        </button>
        {currentStep > 0 && currentStep < totalSteps &&
        <button
          onClick={handleBack}
          className="text-gray-light hover:text-white-accent flex items-center gap-2 text-sm">
          
            <ArrowLeft size={16} /> Back
          </button>
        }
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex items-center justify-center p-6 md:p-12">
        <AnimatePresence mode="wait">
          {/* Step 0: Welcome */}
          {currentStep === 0 &&
          <motion.div
            key="step0"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.4
            }}
            className="max-w-2xl w-full text-center">
            
              <h1 className="font-serif text-5xl md:text-7xl text-white-accent mb-6 leading-tight">
                Let's Value Your Property
              </h1>
              <p className="text-gray-light text-lg md:text-xl mb-12">
                Discover the true market potential of your luxury asset with our
                proprietary valuation engine.
              </p>
              <button
              onClick={handleNext}
              className="bg-gold-primary text-black-primary px-10 py-4 rounded-lg font-bold text-lg hover:bg-gold-light transition-colors inline-flex items-center gap-2">
              
                Get Started <ArrowRight size={20} />
              </button>
            </motion.div>
          }

          {/* Step 1: Property Type */}
          {currentStep === 1 &&
          <motion.div
            key="step1"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.4
            }}
            className="max-w-3xl w-full">
            
              <div className="text-gold-primary text-sm font-bold mb-4">
                1 of 9
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-10">
                What type of property are you valuing?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Residential', 'Commercial', 'Land', 'Mixed-Use'].map(
                (type) =>
                <button
                  key={type}
                  onClick={() => {
                    updateData('type', type);
                    setTimeout(handleNext, 300);
                  }}
                  className={`p-6 text-left rounded-xl border-2 transition-all ${formData.type === type ? 'border-gold-primary bg-gold-primary/10' : 'border-gray-medium bg-gray-dark hover:border-gray-light'}`}>
                  
                      <span
                    className={`text-xl font-medium ${formData.type === type ? 'text-gold-primary' : 'text-white-accent'}`}>
                    
                        {type}
                      </span>
                    </button>

              )}
              </div>
            </motion.div>
          }

          {/* Step 2: Location */}
          {currentStep === 2 &&
          <motion.div
            key="step2"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.4
            }}
            className="max-w-3xl w-full">
            
              <div className="text-gold-primary text-sm font-bold mb-4">
                2 of 9
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-10">
                Where is the property located?
              </h2>
              <input
              type="text"
              autoFocus
              placeholder="Enter address or city..."
              value={formData.location}
              onChange={(e) => updateData('location', e.target.value)}
              className="w-full bg-transparent border-b-2 border-gray-medium focus:border-gold-primary text-3xl md:text-4xl text-white-accent py-4 placeholder-gray-dark outline-none transition-colors" />
            
              <div className="mt-12">
                <button
                onClick={handleNext}
                disabled={!formData.location}
                className="bg-gold-primary disabled:opacity-50 disabled:cursor-not-allowed text-black-primary px-8 py-3 rounded-lg font-bold flex items-center gap-2">
                
                  Continue <ArrowRight size={18} />
                </button>
                <p className="text-gray-medium text-sm mt-4">Press Enter ↵</p>
              </div>
            </motion.div>
          }

          {/* Step 3: Size */}
          {currentStep === 3 &&
          <motion.div
            key="step3"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.4
            }}
            className="max-w-3xl w-full">
            
              <div className="text-gold-primary text-sm font-bold mb-4">
                3 of 9
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-10">
                What is the approximate size?
              </h2>
              <div className="flex items-end gap-4">
                <input
                type="number"
                autoFocus
                placeholder="0"
                value={formData.size}
                onChange={(e) => updateData('size', e.target.value)}
                className="w-full max-w-[200px] bg-transparent border-b-2 border-gray-medium focus:border-gold-primary text-4xl md:text-6xl text-white-accent py-4 placeholder-gray-dark outline-none transition-colors" />
              
                <div className="flex gap-2 mb-4">
                  <button
                  onClick={() => updateData('unit', 'sqft')}
                  className={`px-4 py-2 rounded-md text-sm font-bold ${formData.unit === 'sqft' ? 'bg-gold-primary text-black-primary' : 'bg-gray-dark text-gray-light'}`}>
                  
                    sqft
                  </button>
                  <button
                  onClick={() => updateData('unit', 'sqm')}
                  className={`px-4 py-2 rounded-md text-sm font-bold ${formData.unit === 'sqm' ? 'bg-gold-primary text-black-primary' : 'bg-gray-dark text-gray-light'}`}>
                  
                    sqm
                  </button>
                </div>
              </div>
              <div className="mt-12">
                <button
                onClick={handleNext}
                disabled={!formData.size}
                className="bg-gold-primary disabled:opacity-50 text-black-primary px-8 py-3 rounded-lg font-bold flex items-center gap-2">
                
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          }

          {/* Step 4: Bedrooms */}
          {currentStep === 4 &&
          <motion.div
            key="step4"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.4
            }}
            className="max-w-3xl w-full">
            
              <div className="text-gold-primary text-sm font-bold mb-4">
                4 of 9
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-10">
                Number of bedrooms?
              </h2>
              <div className="flex flex-wrap gap-4">
                {['Studio', '1', '2', '3', '4', '5+'].map((num) =>
              <button
                key={num}
                onClick={() => {
                  updateData('bedrooms', num);
                  setTimeout(handleNext, 300);
                }}
                className={`w-20 h-20 md:w-24 md:h-24 rounded-xl border-2 flex items-center justify-center text-2xl font-medium transition-all ${formData.bedrooms === num ? 'border-gold-primary bg-gold-primary/10 text-gold-primary' : 'border-gray-medium bg-gray-dark text-white-accent hover:border-gray-light'}`}>
                
                    {num}
                  </button>
              )}
              </div>
            </motion.div>
          }

          {/* Step 5: Year Built */}
          {currentStep === 5 &&
          <motion.div
            key="step5"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.4
            }}
            className="max-w-3xl w-full">
            
              <div className="text-gold-primary text-sm font-bold mb-4">
                5 of 9
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-10">
                Year built or last renovated?
              </h2>
              <input
              type="number"
              autoFocus
              placeholder="YYYY"
              value={formData.yearBuilt}
              onChange={(e) => updateData('yearBuilt', e.target.value)}
              className="w-full max-w-[200px] bg-transparent border-b-2 border-gray-medium focus:border-gold-primary text-4xl md:text-6xl text-white-accent py-4 placeholder-gray-dark outline-none transition-colors" />
            
              <div className="mt-12">
                <button
                onClick={handleNext}
                disabled={!formData.yearBuilt}
                className="bg-gold-primary disabled:opacity-50 text-black-primary px-8 py-3 rounded-lg font-bold flex items-center gap-2">
                
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          }

          {/* Step 6: Condition */}
          {currentStep === 6 &&
          <motion.div
            key="step6"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.4
            }}
            className="max-w-3xl w-full">
            
              <div className="text-gold-primary text-sm font-bold mb-4">
                6 of 9
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-10">
                Current condition?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
              'Excellent / Turnkey',
              'Good',
              'Fair',
              'Needs Renovation'].
              map((cond) =>
              <button
                key={cond}
                onClick={() => {
                  updateData('condition', cond);
                  setTimeout(handleNext, 300);
                }}
                className={`p-6 text-left rounded-xl border-2 transition-all ${formData.condition === cond ? 'border-gold-primary bg-gold-primary/10' : 'border-gray-medium bg-gray-dark hover:border-gray-light'}`}>
                
                    <span
                  className={`text-xl font-medium ${formData.condition === cond ? 'text-gold-primary' : 'text-white-accent'}`}>
                  
                      {cond}
                    </span>
                  </button>
              )}
              </div>
            </motion.div>
          }

          {/* Step 7: Features */}
          {currentStep === 7 &&
          <motion.div
            key="step7"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.4
            }}
            className="max-w-3xl w-full">
            
              <div className="text-gold-primary text-sm font-bold mb-4">
                7 of 9
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-10">
                Select key features
              </h2>
              <div className="flex flex-wrap gap-3 mb-12">
                {[
              'Pool',
              'Garden',
              'Garage',
              'Smart Home',
              'Sea View',
              'City View',
              'Penthouse',
              'Historic',
              'Security System',
              'Staff Quarters'].
              map((feat) => {
                const isSelected = formData.features.includes(feat);
                return (
                  <button
                    key={feat}
                    onClick={() => toggleFeature(feat)}
                    className={`px-6 py-3 rounded-full border-2 text-sm font-medium transition-all ${isSelected ? 'border-gold-primary bg-gold-primary text-black-primary' : 'border-gray-medium bg-transparent text-white-accent hover:border-gray-light'}`}>
                    
                      {feat}
                    </button>);

              })}
              </div>
              <button
              onClick={handleNext}
              className="bg-gold-primary text-black-primary px-8 py-3 rounded-lg font-bold flex items-center gap-2">
              
                Continue <ArrowRight size={18} />
              </button>
            </motion.div>
          }

          {/* Step 8: Budget */}
          {currentStep === 8 &&
          <motion.div
            key="step8"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.4
            }}
            className="max-w-3xl w-full">
            
              <div className="text-gold-primary text-sm font-bold mb-4">
                8 of 10
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-10">
                Upload property documents (Optional)
              </h2>
              <div className="space-y-6">
                {formData.documents.length > 0 && (
                  <div className="space-y-3 mb-6">
                    {formData.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-dark border border-gray-medium rounded-lg p-4">
                        <span className="text-white-accent text-sm">{doc.name}</span>
                        <button
                          onClick={() => {
                            updateData('documents', formData.documents.filter((_, i) => i !== idx));
                          }}
                          className="text-gray-light hover:text-gold-primary transition-colors">
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <FileUploadInput
                  onFilesSelected={(files) => {
                    updateData('documents', [...formData.documents, ...files]);
                  }}
                />
              </div>
              <div className="mt-12 flex gap-4">
                <button
                  onClick={handleNext}
                  className="bg-gold-primary text-black-primary px-8 py-3 rounded-lg font-bold flex items-center gap-2">
                  
                    Continue <ArrowRight size={18} />
                  </button>
                <button
                  onClick={handleNext}
                  className="text-gray-light hover:text-white-accent px-4 font-medium">
                  
                    Skip
                  </button>
              </div>
            </motion.div>
          }

          {/* Step 9: Expected Valuation */}
          {currentStep === 9 &&
          <motion.div
            key="step9"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.4
            }}
            className="max-w-3xl w-full">
            
              <div className="text-gold-primary text-sm font-bold mb-4">
                9 of 10
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-10">
                Expected valuation range? (Optional)
              </h2>
              <input
              type="text"
              autoFocus
              placeholder="e.g. $5M - $7M"
              value={formData.budget}
              onChange={(e) => updateData('budget', e.target.value)}
              className="w-full bg-transparent border-b-2 border-gray-medium focus:border-gold-primary text-3xl md:text-4xl text-white-accent py-4 placeholder-gray-dark outline-none transition-colors" />
            
              <div className="mt-12 flex gap-4">
                <button
                onClick={handleNext}
                className="bg-gold-primary text-black-primary px-8 py-3 rounded-lg font-bold flex items-center gap-2">
                
                  Continue <ArrowRight size={18} />
                </button>
                <button
                onClick={handleNext}
                className="text-gray-light hover:text-white-accent px-4 font-medium">
                
                  Skip
                </button>
              </div>
            </motion.div>
          }

          {/* Step 10: Contact */}
          {currentStep === 10 &&
          <motion.div
            key="step10"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.4
            }}
            className="max-w-3xl w-full">
            
              <div className="text-gold-primary text-sm font-bold mb-4">
                10 of 10
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-10">
                Where should we send the report?
              </h2>
              <div className="space-y-6">
                <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => updateData('name', e.target.value)}
                className="w-full bg-transparent border-b-2 border-gray-medium focus:border-gold-primary text-xl md:text-2xl text-white-accent py-3 placeholder-gray-dark outline-none transition-colors" />
              
                <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => updateData('email', e.target.value)}
                className="w-full bg-transparent border-b-2 border-gray-medium focus:border-gold-primary text-xl md:text-2xl text-white-accent py-3 placeholder-gray-dark outline-none transition-colors" />
              
                <input
                type="tel"
                placeholder="Phone Number (Optional)"
                value={formData.phone}
                onChange={(e) => updateData('phone', e.target.value)}
                className="w-full bg-transparent border-b-2 border-gray-medium focus:border-gold-primary text-xl md:text-2xl text-white-accent py-3 placeholder-gray-dark outline-none transition-colors" />
              
              </div>
              <div className="mt-12">
                <button
                onClick={handleNext}
                disabled={!formData.name || !formData.email}
                className="bg-gold-primary disabled:opacity-50 text-black-primary px-10 py-4 rounded-lg font-bold text-lg flex items-center gap-2 hover:bg-gold-light transition-colors">
                
                  Submit Request
                </button>
              </div>
            </motion.div>
          }

          {/* Step 11: Success */}
          {currentStep === 11 &&
          <motion.div
            key="step10"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.4
            }}
            className="max-w-2xl w-full text-center">
            
              <div className="w-24 h-24 bg-gold-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="text-gold-primary" size={48} />
              </div>
              <h1 className="font-serif text-4xl md:text-6xl text-white-accent mb-6 leading-tight">
                Request Received
              </h1>
              <p className="text-gray-light text-lg mb-12">
                Thank you, {formData.name}. Our advisory team is preparing your
                preliminary valuation report and will contact you at{' '}
                {formData.email} shortly.
              </p>
              <button
              onClick={() => window.location.href = '/'}
              className="border border-gray-medium text-white-accent px-8 py-3 rounded-lg font-medium hover:border-gold-primary transition-colors">
              
                Return to Home
              </button>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>);

}
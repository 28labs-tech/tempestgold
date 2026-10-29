import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Upload, X } from "lucide-react";
import { SeoHead } from "../components/SeoHead";
import { propertyCategories } from "../data/consultancy";
import { Link } from "react-router-dom";
import { sendEnquiry } from "../api/enquiries";
import {
  CONSENT_VERSION,
  enquiryConsent,
  marketingConsent,
} from "../data/consent";
export function Valuation() {
  const [sending, setSending] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [deliveryError, setDeliveryError] = useState("");
  const [consent, setConsent] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const requestId = useRef(crypto.randomUUID());
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    type: "",
    location: "",
    size: "",
    unit: "sqm",
    bedrooms: "",
    yearBuilt: "",
    condition: "",
    features: [] as string[],
    budget: "",
    documents: [] as File[],
    name: "",
    email: "",
    phone: "",
  });
  const totalSteps = 11;
  const progressLabel = `${formData.type !== "Residential" && currentStep > 4 ? currentStep - 1 : currentStep} of ${formData.type && formData.type !== "Residential" ? 9 : 10}`;
  // Handle Enter key to advance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "Enter" &&
        currentStep > 0 &&
        currentStep < 10 &&
        !(e.target instanceof HTMLTextAreaElement) &&
        !(e.target instanceof HTMLButtonElement)
      ) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, formData]);
  const handleNext = async () => {
    if (sending) return;
    if (currentStep === 2 && !formData.location.trim()) return;
    if (currentStep === 3 && !(Number(formData.size) > 0)) return;
    if (
      currentStep === 10 &&
      (!formData.name.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
    )
      return;
    if (currentStep === 10) {
      if (!consent) return;
      setSending(true);
      setDeliveryError("");
      try {
        const result = await sendEnquiry({
          requestId: requestId.current,
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone,
          service: "Property Valuation",
          property: formData.location,
          intent: "Valuation consultation",
          consent: true,
          consentVersion: CONSENT_VERSION,
          consentTimestamp: new Date().toISOString(),
          marketingConsent: marketing,
          message: `Property: ${formData.type}, ${formData.location}\nArea: ${formData.size} ${formData.unit}\nBedrooms: ${formData.type === "Residential" ? formData.bedrooms : "Not applicable"}\nYear built: ${formData.yearBuilt || "Not provided"}\nCondition: ${formData.condition}\nFeatures: ${formData.features.join(", ")}\nExpected range (P): ${formData.budget}\nDocuments are not attached.`,
        });
        setCaptured(result.status === "captured");
        setCurrentStep(11);
      } catch (error) {
        setDeliveryError(
          error instanceof Error ? error.message : "Unable to send enquiry.",
        );
      } finally {
        setSending(false);
      }
      return;
    }
    if (currentStep < totalSteps)
      setCurrentStep(
        currentStep === 3 && formData.type !== "Residential"
          ? 5
          : currentStep + 1,
      );
  };
  const handleBack = () => {
    if (currentStep > 0)
      setCurrentStep(
        currentStep === 5 && formData.type !== "Residential"
          ? 3
          : currentStep - 1,
      );
  };
  const updateData = (key: string, value: string | string[] | File[]) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const toggleFeature = (feature: string) => {
    setFormData((prev) => {
      const exists = prev.features.includes(feature);
      if (exists) {
        return {
          ...prev,
          features: prev.features.filter((f) => f !== feature),
        };
      } else {
        return {
          ...prev,
          features: [...prev.features, feature],
        };
      }
    });
  };
  const slideVariants = {
    enter: {
      y: 50,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: -50,
      opacity: 0,
    },
  };

  const FileUploadInput = ({
    onFilesSelected,
  }: {
    onFilesSelected: (files: File[]) => void;
  }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files).filter(
          (file) => file.size <= 25 * 1024 * 1024,
        );
        onFilesSelected(files);
      }
    };

    return (
      <div
        className="border-2 border-dashed border-gray-medium rounded-xl p-8 cursor-pointer hover:border-gold-primary transition-colors"
        role="button"
        tabIndex={0}
        aria-label="Select documents to keep for your consultation"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        onClick={(e) => {
          if (e.target !== fileInputRef.current) fileInputRef.current?.click();
        }}
      >
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
            Keep documents ready for your consultation
          </p>
          <p className="text-gray-light text-sm">
            PDF, Word, Image, or ZIP files (Max 25MB each). Files remain on your
            device and are not uploaded. Larger files are excluded.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black-primary flex flex-col overflow-hidden">
      <SeoHead
        title="Property Valuation - Tempest Gold"
        description="Prepare a Botswana property valuation enquiry. Discuss the purpose, scope and market evidence with a property adviser."
        url="/valuation"
      />
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-primary/10 via-black-primary to-black-primary pointer-events-none"></div>

      {/* Progress Bar */}
      {currentStep > 0 && currentStep < totalSteps && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-dark z-10">
          <motion.div
            className="h-full bg-gold-primary"
            initial={{
              width: 0,
            }}
            animate={{
              width: `${(currentStep / (totalSteps - 1)) * 100}%`,
            }}
            transition={{
              duration: 0.3,
            }}
          />
        </div>
      )}

      {/* Header Controls */}
      <div className="relative z-10 p-6 md:p-12 flex justify-between items-center">
        <button
          onClick={() => window.history.back()}
          className="text-white-accent font-serif font-bold text-xl tracking-widest uppercase hover:text-gold-primary transition-colors"
        >
          Tempest Gold
        </button>
        {currentStep > 0 && currentStep < totalSteps && (
          <button
            onClick={handleBack}
            className="text-gray-light hover:text-white-accent flex items-center gap-2 text-sm"
          >
            <ArrowLeft size={16} /> Back
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-y-auto p-6 md:p-12 valuation-content">
        <AnimatePresence mode="wait">
          {/* Step 0: Welcome */}
          {currentStep === 0 && (
            <motion.div
              key="step0"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.4,
              }}
              className="max-w-2xl w-full text-center"
            >
              <h1 className="font-serif text-5xl md:text-7xl text-white-accent mb-6 leading-tight">
                Discuss Your Property Valuation
              </h1>
              <p className="text-gray-light text-lg md:text-xl mb-12">
                Prepare your property details for a professional valuation
                conversation. This is an enquiry, not an automated valuation or
                a report. Your details remain on this device until you send an
                email yourself.
              </p>
              <button
                onClick={handleNext}
                className="bg-gold-primary text-black-primary px-10 py-4 rounded-lg font-bold text-lg hover:bg-gold-light transition-colors inline-flex items-center gap-2"
              >
                Discuss Your Property Needs <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {/* Step 1: Property Type */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.4,
              }}
              className="max-w-3xl w-full"
            >
              <div className="text-gold-primary text-sm font-bold mb-4">
                {progressLabel}
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-10">
                What type of property are you valuing?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {propertyCategories.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      updateData("type", type);
                      setTimeout(handleNext, 300);
                    }}
                    className={`p-6 text-left rounded-xl border-2 transition-all ${formData.type === type ? "border-gold-primary bg-gold-primary/10" : "border-gray-medium bg-gray-dark hover:border-gray-light"}`}
                  >
                    <span
                      className={`text-xl font-medium ${formData.type === type ? "text-gold-primary" : "text-white-accent"}`}
                    >
                      {type}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.4,
              }}
              className="max-w-3xl w-full"
            >
              <div className="text-gold-primary text-sm font-bold mb-4">
                {progressLabel}
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-10">
                Where is the property located?
              </h2>
              <input
                type="text"
                autoFocus
                placeholder="Enter address or city..."
                aria-label="Property address or city in Botswana"
                value={formData.location}
                onChange={(e) => updateData("location", e.target.value)}
                className="w-full bg-transparent border-b-2 border-gray-medium focus:border-gold-primary text-3xl md:text-4xl text-white-accent py-4 placeholder-gray-dark outline-none transition-colors"
              />

              <div className="mt-12">
                <button
                  onClick={handleNext}
                  disabled={!formData.location}
                  className="bg-gold-primary disabled:opacity-50 disabled:cursor-not-allowed text-black-primary px-8 py-3 rounded-lg font-bold flex items-center gap-2"
                >
                  Continue <ArrowRight size={18} />
                </button>
                <p className="text-gray-medium text-sm mt-4">Press Enter ↵</p>
              </div>
            </motion.div>
          )}

          {/* Step 3: Size */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.4,
              }}
              className="max-w-3xl w-full"
            >
              <div className="text-gold-primary text-sm font-bold mb-4">
                {progressLabel}
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-10">
                What is the approximate size?
              </h2>
              <div className="flex items-end gap-4">
                <input
                  type="number"
                  autoFocus
                  placeholder="0"
                  aria-label="Approximate property area"
                  min="1"
                  value={formData.size}
                  onChange={(e) => updateData("size", e.target.value)}
                  className="w-full max-w-[200px] bg-transparent border-b-2 border-gray-medium focus:border-gold-primary text-4xl md:text-6xl text-white-accent py-4 placeholder-gray-dark outline-none transition-colors"
                />

                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => updateData("unit", "sqft")}
                    className={`px-4 py-2 rounded-md text-sm font-bold ${formData.unit === "sqft" ? "bg-gold-primary text-black-primary" : "bg-gray-dark text-gray-light"}`}
                  >
                    sqft
                  </button>
                  <button
                    onClick={() => updateData("unit", "sqm")}
                    className={`px-4 py-2 rounded-md text-sm font-bold ${formData.unit === "sqm" ? "bg-gold-primary text-black-primary" : "bg-gray-dark text-gray-light"}`}
                  >
                    sqm
                  </button>
                </div>
              </div>
              <div className="mt-12">
                <button
                  onClick={handleNext}
                  disabled={!formData.size}
                  className="bg-gold-primary disabled:opacity-50 text-black-primary px-8 py-3 rounded-lg font-bold flex items-center gap-2"
                >
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Bedrooms */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.4,
              }}
              className="max-w-3xl w-full"
            >
              <div className="text-gold-primary text-sm font-bold mb-4">
                {progressLabel}
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-10">
                Number of bedrooms?
              </h2>
              <div className="flex flex-wrap gap-4">
                {["Studio", "1", "2", "3", "4", "5+"].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      updateData("bedrooms", num);
                      setTimeout(handleNext, 300);
                    }}
                    className={`w-20 h-20 md:w-24 md:h-24 rounded-xl border-2 flex items-center justify-center text-2xl font-medium transition-all ${formData.bedrooms === num ? "border-gold-primary bg-gold-primary/10 text-gold-primary" : "border-gray-medium bg-gray-dark text-white-accent hover:border-gray-light"}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 5: Year Built */}
          {currentStep === 5 && (
            <motion.div
              key="step5"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.4,
              }}
              className="max-w-3xl w-full"
            >
              <div className="text-gold-primary text-sm font-bold mb-4">
                {progressLabel}
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-10">
                Year built or last renovated? (If applicable)
              </h2>
              <input
                type="number"
                autoFocus
                placeholder="YYYY"
                aria-label="Year built, if known"
                value={formData.yearBuilt}
                onChange={(e) => updateData("yearBuilt", e.target.value)}
                className="w-full max-w-[200px] bg-transparent border-b-2 border-gray-medium focus:border-gold-primary text-4xl md:text-6xl text-white-accent py-4 placeholder-gray-dark outline-none transition-colors"
              />

              <div className="mt-12">
                <button
                  onClick={handleNext}
                  className="bg-gold-primary disabled:opacity-50 text-black-primary px-8 py-3 rounded-lg font-bold flex items-center gap-2"
                >
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 6: Condition */}
          {currentStep === 6 && (
            <motion.div
              key="step6"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.4,
              }}
              className="max-w-3xl w-full"
            >
              <div className="text-gold-primary text-sm font-bold mb-4">
                {progressLabel}
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-10">
                Current condition?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Excellent / Turnkey",
                  "Good",
                  "Fair",
                  "Needs Renovation",
                  "Not applicable / Unsure",
                ].map((cond) => (
                  <button
                    key={cond}
                    onClick={() => {
                      updateData("condition", cond);
                      setTimeout(handleNext, 300);
                    }}
                    className={`p-6 text-left rounded-xl border-2 transition-all ${formData.condition === cond ? "border-gold-primary bg-gold-primary/10" : "border-gray-medium bg-gray-dark hover:border-gray-light"}`}
                  >
                    <span
                      className={`text-xl font-medium ${formData.condition === cond ? "text-gold-primary" : "text-white-accent"}`}
                    >
                      {cond}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 7: Features */}
          {currentStep === 7 && (
            <motion.div
              key="step7"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.4,
              }}
              className="max-w-3xl w-full"
            >
              <div className="text-gold-primary text-sm font-bold mb-4">
                {progressLabel}
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-10">
                Select key features
              </h2>
              <div className="flex flex-wrap gap-3 mb-12">
                {[
                  "Pool",
                  "Garden",
                  "Garage",
                  "Smart Home",
                  "Road Access",
                  "City View",
                  "Loading Access",
                  "Power Supply",
                  "Security System",
                  "Staff Quarters",
                ].map((feat) => {
                  const isSelected = formData.features.includes(feat);
                  return (
                    <button
                      key={feat}
                      onClick={() => toggleFeature(feat)}
                      className={`px-6 py-3 rounded-full border-2 text-sm font-medium transition-all ${isSelected ? "border-gold-primary bg-gold-primary text-black-primary" : "border-gray-medium bg-transparent text-white-accent hover:border-gray-light"}`}
                    >
                      {feat}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={handleNext}
                className="bg-gold-primary text-black-primary px-8 py-3 rounded-lg font-bold flex items-center gap-2"
              >
                Continue <ArrowRight size={18} />
              </button>
            </motion.div>
          )}

          {/* Step 8: Budget */}
          {currentStep === 8 && (
            <motion.div
              key="step8"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.4,
              }}
              className="max-w-3xl w-full"
            >
              <div className="text-gold-primary text-sm font-bold mb-4">
                {progressLabel}
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-10">
                Select property documents (Optional)
              </h2>
              <div className="space-y-6">
                {formData.documents.length > 0 && (
                  <div className="space-y-3 mb-6">
                    {formData.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-gray-dark border border-gray-medium rounded-lg p-4"
                      >
                        <span className="text-white-accent text-sm">
                          {doc.name}
                        </span>
                        <button
                          onClick={() => {
                            updateData(
                              "documents",
                              formData.documents.filter((_, i) => i !== idx),
                            );
                          }}
                          className="text-gray-light hover:text-gold-primary transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <FileUploadInput
                  onFilesSelected={(files) => {
                    updateData("documents", [...formData.documents, ...files]);
                  }}
                />
              </div>
              <div className="mt-12 flex gap-4">
                <button
                  onClick={handleNext}
                  className="bg-gold-primary text-black-primary px-8 py-3 rounded-lg font-bold flex items-center gap-2"
                >
                  Continue <ArrowRight size={18} />
                </button>
                <button
                  onClick={handleNext}
                  className="text-gray-light hover:text-white-accent px-4 font-medium"
                >
                  Skip
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 9: Expected Valuation */}
          {currentStep === 9 && (
            <motion.div
              key="step9"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.4,
              }}
              className="max-w-3xl w-full"
            >
              <div className="text-gold-primary text-sm font-bold mb-4">
                {progressLabel}
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-10">
                Expected valuation range? (Optional)
              </h2>
              <input
                type="text"
                autoFocus
                placeholder="Expected range in Pula (P), if known"
                aria-label="Expected valuation range in Pula, optional"
                value={formData.budget}
                onChange={(e) => updateData("budget", e.target.value)}
                className="w-full bg-transparent border-b-2 border-gray-medium focus:border-gold-primary text-3xl md:text-4xl text-white-accent py-4 placeholder-gray-dark outline-none transition-colors"
              />

              <div className="mt-12 flex gap-4">
                <button
                  onClick={handleNext}
                  className="bg-gold-primary text-black-primary px-8 py-3 rounded-lg font-bold flex items-center gap-2"
                >
                  Continue <ArrowRight size={18} />
                </button>
                <button
                  onClick={handleNext}
                  className="text-gray-light hover:text-white-accent px-4 font-medium"
                >
                  Skip
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 10: Contact */}
          {currentStep === 10 && (
            <motion.div
              key="step10"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.4,
              }}
              className="max-w-3xl w-full"
            >
              <div className="text-gold-primary text-sm font-bold mb-4">
                {progressLabel}
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-white-accent mb-10">
                How can an adviser contact you?
              </h2>
              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  aria-label="Full name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => updateData("name", e.target.value)}
                  className="w-full bg-transparent border-b-2 border-gray-medium focus:border-gold-primary text-xl md:text-2xl text-white-accent py-3 placeholder-gray-dark outline-none transition-colors"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  aria-label="Email address"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => updateData("email", e.target.value)}
                  className="w-full bg-transparent border-b-2 border-gray-medium focus:border-gold-primary text-xl md:text-2xl text-white-accent py-3 placeholder-gray-dark outline-none transition-colors"
                />

                <input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  aria-label="Phone number, optional"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => updateData("phone", e.target.value)}
                  className="w-full bg-transparent border-b-2 border-gray-medium focus:border-gold-primary text-xl md:text-2xl text-white-accent py-3 placeholder-gray-dark outline-none transition-colors"
                />
              </div>
              <label className="consent-label mt-6">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span>
                  <strong>Required.</strong> {enquiryConsent}{" "}
                  <Link to="/privacy">Privacy Notice</Link>
                </span>
              </label>
              <label className="consent-label mt-6">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                />
                <span>
                  <strong>Optional.</strong> {marketingConsent}
                </span>
              </label>
              {deliveryError && <p role="alert">{deliveryError}</p>}
              <div className="mt-12">
                <button
                  onClick={handleNext}
                  disabled={
                    !formData.name || !formData.email || !consent || sending
                  }
                  className="bg-gold-primary disabled:opacity-50 text-black-primary px-10 py-4 rounded-lg font-bold text-lg flex items-center gap-2 hover:bg-gold-light transition-colors"
                >
                  Request a Consultation
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 11: Success */}
          {currentStep === 11 && (
            <motion.div
              key="step10"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.4,
              }}
              className="max-w-2xl w-full text-center"
            >
              <div className="w-24 h-24 bg-gold-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="text-gold-primary" size={48} />
              </div>
              <h1 className="font-serif text-4xl md:text-6xl text-white-accent mb-6 leading-tight">
                {captured ? "Test Enquiry Captured" : "Enquiry Sent"}
              </h1>
              <p className="text-gray-light text-lg mb-12">
                {captured
                  ? "Your enquiry was captured in the Mailtrap sandbox. No live mailbox received it."
                  : "Your enquiry was accepted by our email server. An adviser can reply to your email address."}{" "}
                No valuation report or appointment has been created.
              </p>
              <textarea
                aria-label="Valuation enquiry summary"
                readOnly
                rows={7}
                value={`Valuation enquiry\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nProperty: ${formData.type}, ${formData.location}\nArea: ${formData.size} ${formData.unit}\nCondition: ${formData.condition}\nFeatures: ${formData.features.join(", ")}\nExpected range (P): ${formData.budget}`}
              />
              <p className="muted-small">
                Documents selected in this wizard remain on your device and are
                not uploaded or attached.{" "}
                <Link to="/privacy">Privacy Notice</Link>
              </p>
              <button
                onClick={() => (window.location.href = "/")}
                className="border border-gray-medium text-white-accent px-8 py-3 rounded-lg font-medium hover:border-gold-primary transition-colors"
              >
                Return to Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { API_BASE } from "../config/api";



// Progress Bar
const ProgressBar = ({ step, maxSteps }) => (
  <div className="w-full mb-8">
    <div className="flex justify-between text-xs text-gray-400 mb-2">
      <span className={step >= 1 ? "text-white font-semibold" : ""}>Details</span>
      <span className={step >= 2 ? "text-white font-semibold" : ""}>Payment</span>
      <span className={step >= 3 ? "text-white font-semibold" : ""}>Confirm</span>
    </div>
    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: `${(step / maxSteps) * 100}%` }}
        transition={{ duration: 0.5 }}
        className="h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
      />
    </div>
  </div>
);

// Input Component
const InputField = ({ label, value, onChange, placeholder, error, type = "text" }) => (
  <div className="mb-4">
    <label className="block text-xs font-semibold text-gray-300 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-lg bg-white/5 border transition focus:outline-none focus:ring-2 ${
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-white/10 focus:ring-purple-500 focus:border-transparent"
      } text-white placeholder-gray-500`}
    />
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

// Select Component
const SelectField = ({ label, value, onChange, options, error }) => (
  <div className="mb-4">
    <label className="block text-xs font-semibold text-gray-300 mb-2">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 rounded-lg bg-white/5 border transition appearance-none focus:outline-none focus:ring-2 ${
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-white/10 focus:ring-purple-500 focus:border-transparent"
      } text-white`}
    >
      {/* option elements receive explicit dark styling so the dropdown list isn’t a white-on-white mess */}
      <option value="" className="bg-gray-800 text-gray-400">
        Select...
      </option>
      {options.map((opt) => {
        // Extract leading number for values like "1 Member" or "2 Members"
        const match = String(opt).match(/^(\d+)/);
        const optValue = match ? match[1] : opt;
        const optLabel = opt;
        return (
          <option key={optValue} value={optValue} className="bg-gray-800 text-white">
            {optLabel}
          </option>
        );
      })}
    </select>
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

// File upload widget used in payment step
const FileUpload = ({
  selectedFile,
  setSelectedFile,
  previewURL,
  setPreviewURL,
  error,
  setError,
  disabled
}) => {
  const inputRef = useRef();

  const reset = () => {
    if (previewURL) {
      URL.revokeObjectURL(previewURL);
    }
    setSelectedFile(null);
    setPreviewURL(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const validateAndSet = (file) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setError("Invalid file type (jpg, png, webp only)");
      reset();
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File exceeds 5MB");
      reset();
      return;
    }
    setError("");
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  const onDrop = (e) => {
    e.preventDefault();
    if (disabled) return;
    const f = e.dataTransfer.files[0];
    if (f) validateAndSet(f);
  };

  const onChange = (e) => {
    if (disabled) return;
    const f = e.target.files[0];
    if (f) validateAndSet(f);
  };

  return (
    <div>
      {!selectedFile ? (
        <div
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="h-40 rounded-xl border-2 border-dashed border-white/20 flex items-center justify-center flex-col text-center mb-4 p-4 hover:border-white/40 transition bg-transparent"
        >
          <p className="text-gray-400 text-sm mb-2">Drag & drop screenshot here or</p>
          <button
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
            className="text-blue-400 hover:text-blue-300 text-sm font-semibold"
          >
            browse files
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={onChange}
          />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mb-4 bg-white/10 backdrop-blur-md rounded-lg p-4 flex items-center gap-4"
        >
          {previewURL && (
            <img
              src={previewURL}
              alt="preview"
              className="w-16 h-16 object-cover rounded-md"
            />
          )}
          <div className="flex-1">
            <p className="text-sm font-medium text-white truncate">
              {selectedFile.name}
            </p>
            <p className="text-xs text-gray-400">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={reset}
              className="px-2 py-1 bg-red-600/80 hover:bg-red-600 rounded-full text-white text-xs transition transform hover:scale-105"
              aria-label="Remove file"
            >
              ✕
            </button>
            <button
              onClick={() => inputRef.current?.click()}
              className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded-full text-white text-xs transition transform hover:scale-105"
              aria-label="Replace file"
            >
              Replace
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={onChange}
            />
          </div>
        </motion.div>
      )}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};

const WIP = () => {
  const [step, setStep] = useState(1);
  const [registrationId, setRegistrationId] = useState(null);
  const [qrUrl, setQrUrl] = useState(null);
  const [amount, setAmount] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [fileError, setFileError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [teamSize, setTeamSize] = useState("1"); // default 1 member
  const [registrationType, setRegistrationType] = useState('team');
  const size = parseInt(teamSize) || 0; // numeric value derived from dropdown

  // Form State
  const [teamName, setTeamName] = useState("");
  const [leader, setLeader] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    year: "",
    branch: "",
  });
  const [members, setMembers] = useState([
    { name: "", email: "", phone: "", college: "", year: "", branch: "" },
    { name: "", email: "", phone: "", college: "", year: "", branch: "" },
  ]);


  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  // uploading replaced by isUploading state above



  // Validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);

  const validateStep1 = () => {
    const e = {};
    // basic team info
    if (!teamSize) e.teamSize = "Team size required";
    if (!teamName) e.teamName = "Team name required";

    // leader validations
    if (!leader.name) e.leaderName = "Leader name required";
    if (!leader.email || !validateEmail(leader.email)) e.leaderEmail = "Valid email required";
    if (!leader.phone || !validatePhone(leader.phone)) e.leaderPhone = "10-digit phone required";
    if (!leader.college) e.leaderCollege = "College required";
    if (!leader.year) e.leaderYear = "Year required";
    if (!leader.branch) e.leaderBranch = "Branch required";

    // additional members based on team size (teamSize includes leader)
    const size = parseInt(teamSize);
    // If individual mode, skip extra member validations
    if (registrationType === 'individual') {
      setErrors(e);
      return Object.keys(e).length === 0;
    }

    if (size >= 2) {
      const m = members[0];
      if (!m.name) e.member0Name = "Name required";
      if (!m.email || !validateEmail(m.email)) e.member0Email = "Valid email required";
      if (!m.phone || !validatePhone(m.phone)) e.member0Phone = "10-digit phone required";
      if (!m.college) e.member0College = "College required";
      if (!m.year) e.member0Year = "Year required";
      if (!m.branch) e.member0Branch = "Branch required";
    }
    if (size === 3) {
      const m = members[1];
      if (!m.name) e.member1Name = "Name required";
      if (!m.email || !validateEmail(m.email)) e.member1Email = "Valid email required";
      if (!m.phone || !validatePhone(m.phone)) e.member1Phone = "10-digit phone required";
      if (!m.college) e.member1College = "College required";
      if (!m.year) e.member1Year = "Year required";
      if (!m.branch) e.member1Branch = "Branch required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const isStep1Complete = () => {
    if (!teamSize || !teamName) return false;
    if (
      !leader.name ||
      !validateEmail(leader.email) ||
      !validatePhone(leader.phone) ||
      !leader.college ||
      !leader.year ||
      !leader.branch
    ) {
      return false;
    }
    const size = parseInt(teamSize);
    if (registrationType === 'individual') return true;

    if (size >= 2) {
      const m = members[0];
      if (
        !m.name ||
        !validateEmail(m.email) ||
        !validatePhone(m.phone) ||
        !m.college ||
        !m.year ||
        !m.branch
      ) {
        return false;
      }
    }
    if (size === 3) {
      const m = members[1];
      if (
        !m.name ||
        !validateEmail(m.email) ||
        !validatePhone(m.phone) ||
        !m.college ||
        !m.year ||
        !m.branch
      ) {
        return false;
      }
    }
    return true;
  };

  const submitForm = async () => {
    if (!validateStep1()) return;
    setLoading(true);
    try {
      let size = parseInt(teamSize);
      if (registrationType === 'individual') size = 1;
      // build member list where first element is leader followed by any filled extra members
      const populatedExtras = [];
      if (size >= 2) populatedExtras.push(members[0]);
      if (size === 3) populatedExtras.push(members[1]);
      const payload = {
        registrationType,
        teamSize: size,
        teamName,
        members: [leader, ...populatedExtras].map((m) => ({
          name: m.name,
          email: m.email,
          phone: m.phone,
          college: m.college,
          year: m.year,
          branch: m.branch,
        })),
      };

      const res = await fetch(`${API_BASE}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      setRegistrationId(data.registrationId);
      setAmount(data.amount);

      // request generated QR (base64) from backend for consistent rendering
      try {
        const gen = await fetch(`${API_BASE}/api/generate-payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ registrationId: data.registrationId, amount: data.amount })
        });
        const j = await gen.json();
        if (gen.ok && j.qrCode) {
          setQrUrl(`data:image/png;base64,${j.qrCode}`);
        } else if (data.qrCodeUrl) {
          setQrUrl(data.qrCodeUrl);
        }
      } catch (qrErr) {
        // fallback to legacy URL
        setQrUrl(data.qrCodeUrl);
      }

      setStep(2);
    } catch (err) {
      alert("Error: " + (err.message || "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  const uploadPayment = async () => {
    if (!selectedFile || fileError) return alert("Select a valid screenshot");
    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append("screenshot", selectedFile);
      fd.append("registrationId", registrationId);

      const res = await fetch(`${API_BASE}/api/upload-payment`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setStep(3);
    } catch (err) {
      alert("Error: " + (err.message || "Upload failed"));
    } finally {
      setIsUploading(false);
    }
  };


  const years = ["1st", "2nd", "3rd", "4th"];
  const branches = ["CSE", "ECE", "EEE", "ME", "Civil", "BME", "Mining"];

  return (
    <section className="relative min-h-screen py-20 px-6 text-white">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 text-transparent bg-clip-text">
              Hackathon Registration
            </span>
          </h1>
          <p className="text-gray-400">Join INFINITY 2K26 · March 12–13</p>
        </motion.div>

        {/* Registration Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          {step === 1 && (
            <>
              <ProgressBar step={1} maxSteps={3} />

              {/* Team Registration */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                    {/* Registration Type Toggle */}
                    <div className="mb-4 flex gap-2">
                      <button
                        onClick={() => { setRegistrationType('individual'); setTeamSize('1'); }}
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${registrationType === 'individual' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-white/5 text-white'}`}
                      >
                        Individual
                      </button>
                      <button
                        onClick={() => setRegistrationType('team')}
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${registrationType === 'team' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-white/5 text-white'}`}
                      >
                        Team
                      </button>
                    </div>

                    {/* Team Size Dropdown */}
                  <SelectField
                    label="Number of Team Members"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    options={["1 Member", "2 Members", "3 Members"]}
                    error={errors.teamSize}
                  />

                  {/* Team Name */}
                  <InputField
                    label="Team Name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter your team name"
                    error={errors.teamName}
                  />

                  {/* Leader Section */}
                  <div className="mb-8 p-4 rounded-lg bg-white/3 border border-white/5">
                    <h3 className="text-sm font-semibold text-gray-200 mb-4">Team Leader</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Full Name"
                        value={leader.name}
                        onChange={(e) => setLeader({ ...leader, name: e.target.value })}
                        placeholder="Full name"
                        error={errors.leaderName}
                      />
                      <InputField
                        label="Email"
                        type="email"
                        value={leader.email}
                        onChange={(e) => setLeader({ ...leader, email: e.target.value })}
                        placeholder="email@example.com"
                        error={errors.leaderEmail}
                      />
                      <InputField
                        label="Phone"
                        value={leader.phone}
                        onChange={(e) => setLeader({ ...leader, phone: e.target.value })}
                        placeholder="10-digit number"
                        error={errors.leaderPhone}
                      />
                      <InputField
                        label="College"
                        value={leader.college}
                        onChange={(e) => setLeader({ ...leader, college: e.target.value })}
                        placeholder="College name"
                        error={errors.leaderCollege}
                      />
                      <SelectField
                        label="Year"
                        value={leader.year}
                        onChange={(e) => setLeader({ ...leader, year: e.target.value })}
                        options={years}
                        error={errors.leaderYear}
                      />
                      <SelectField
                        label="Branch"
                        value={leader.branch}
                        onChange={(e) => setLeader({ ...leader, branch: e.target.value })}
                        options={branches}
                        error={errors.leaderBranch}
                      />
                    </div>
                  </div>

                  {size >= 2 && (
                    <>
                      {/* Member 2 Section */}
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-8 p-4 rounded-lg bg-white/3 border border-white/5"
                      >
                        <h3 className="text-sm font-semibold text-gray-200 mb-4">Member 2</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <InputField
                            label="Full Name"
                            value={members[0]?.name || ""}
                            onChange={(e) => {
                              const newMembers = [...members];
                              newMembers[0].name = e.target.value;
                              setMembers(newMembers);
                            }}
                            placeholder="Full name"
                          />
                          <InputField
                            label="Email"
                            type="email"
                            value={members[0]?.email || ""}
                            onChange={(e) => {
                              const newMembers = [...members];
                              newMembers[0].email = e.target.value;
                              setMembers(newMembers);
                            }}
                            placeholder="email@example.com"
                            error={errors.member0Email}
                          />
                          <InputField
                            label="Phone"
                            value={members[0]?.phone || ""}
                            onChange={(e) => {
                              const newMembers = [...members];
                              newMembers[0].phone = e.target.value;
                              setMembers(newMembers);
                            }}
                            placeholder="10-digit number"
                            error={errors.member0Phone}
                          />
                          <InputField
                            label="College"
                            value={members[0]?.college || ""}
                            onChange={(e) => {
                              const newMembers = [...members];
                              newMembers[0].college = e.target.value;
                              setMembers(newMembers);
                            }}
                            placeholder="College name"
                          />
                          <SelectField
                            label="Year"
                            value={members[0]?.year || ""}
                            onChange={(e) => {
                              const newMembers = [...members];
                              newMembers[0].year = e.target.value;
                              setMembers(newMembers);
                            }}
                            options={years}
                          />
                          <SelectField
                            label="Branch"
                            value={members[0]?.branch || ""}
                            onChange={(e) => {
                              const newMembers = [...members];
                              newMembers[0].branch = e.target.value;
                              setMembers(newMembers);
                            }}
                            options={branches}
                          />
                        </div>
                      </motion.div>

                      {/* Member 3 Section - Conditionally Rendered */}
                      {size === 3 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mb-8 p-4 rounded-lg bg-white/3 border border-white/5"
                        >
                          <h3 className="text-sm font-semibold text-gray-200 mb-4">Member 3</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputField
                              label="Full Name"
                              value={members[1]?.name || ""}
                              onChange={(e) => {
                                const newMembers = [...members];
                                newMembers[1].name = e.target.value;
                                setMembers(newMembers);
                              }}
                              placeholder="Full name"
                            />
                            <InputField
                              label="Email"
                              type="email"
                              value={members[1]?.email || ""}
                              onChange={(e) => {
                                const newMembers = [...members];
                                newMembers[1].email = e.target.value;
                                setMembers(newMembers);
                              }}
                              placeholder="email@example.com"
                              error={errors.member1Email}
                            />
                            <InputField
                              label="Phone"
                              value={members[1]?.phone || ""}
                              onChange={(e) => {
                                const newMembers = [...members];
                                newMembers[1].phone = e.target.value;
                                setMembers(newMembers);
                              }}
                              placeholder="10-digit number"
                              error={errors.member1Phone}
                            />
                            <InputField
                              label="College"
                              value={members[1]?.college || ""}
                              onChange={(e) => {
                                const newMembers = [...members];
                                newMembers[1].college = e.target.value;
                                setMembers(newMembers);
                              }}
                              placeholder="College name"
                            />
                            <SelectField
                              label="Year"
                              value={members[1]?.year || ""}
                              onChange={(e) => {
                                const newMembers = [...members];
                                newMembers[1].year = e.target.value;
                                setMembers(newMembers);
                              }}
                              options={years}
                            />
                            <SelectField
                              label="Branch"
                              value={members[1]?.branch || ""}
                              onChange={(e) => {
                                const newMembers = [...members];
                                newMembers[1].branch = e.target.value;
                                setMembers(newMembers);
                              }}
                              options={branches}
                            />
                          </div>
                        </motion.div>
                      )}
                    </>
                  )}
                </motion.div>
              
              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-end gap-4">
                <button
                  onClick={() => window.history.back()}
                  className="px-6 py-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={submitForm}
                  disabled={loading || !isStep1Complete()}
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition transform hover:scale-105 disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Next: Payment"}
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <ProgressBar step={2} maxSteps={3} />
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <h2 className="text-2xl font-bold mb-8">Complete Payment</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* QR Code Card */}
                  <div className="p-6 rounded-xl bg-white/3 border border-white/5 flex flex-col items-center justify-center">
                    <p className="text-xs text-gray-400 mb-3">Registration ID</p>
                    <p className="font-mono text-lg font-semibold mb-4">{registrationId}</p>

                    <div className="mb-4 text-center">
                      <p className="text-xs text-gray-400">Team Size</p>
                      <p className="text-sm font-semibold text-cyan-300">{size} {size === 1 ? 'Member' : 'Members'}</p>
                    </div>

                    {qrUrl ? (
                      <img src={qrUrl} alt="QR Code" className="w-48 h-48 rounded-lg shadow-xl mb-4" />
                    ) : (
                      <div className="w-48 h-48 rounded-lg bg-gray-800 animate-pulse mb-4" />
                    )}

                    <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 mb-4">
                      <p className="text-sm text-gray-300">Amount: <span className="font-bold text-cyan-300">₹{amount || 1000}</span></p>
                    </div>
                    <p className="text-xs text-gray-400">UPI: <span className="font-mono">einsteinellandala@okicici</span></p>
                  </div>

                  {/* Upload Card */}
                  <div className="p-6 rounded-xl bg-white/3 border border-white/5 flex flex-col">
                    <h3 className="text-sm font-semibold text-gray-200 mb-4">Upload Payment Screenshot</h3>

                    <FileUpload
                      selectedFile={selectedFile}
                      setSelectedFile={setSelectedFile}
                      previewURL={previewURL}
                      setPreviewURL={setPreviewURL}
                      error={fileError}
                      setError={setFileError}
                      disabled={isUploading}
                    />

                    <div className="flex gap-4">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition"
                      >
                        Back
                      </button>
                      <button
                        onClick={uploadPayment}
                        disabled={isUploading || !selectedFile || !!fileError}
                        className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50"
                      >
                        {isUploading ? "Uploading..." : "Submit"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}

          {step === 3 && (
            <>
              <ProgressBar step={3} maxSteps={3} />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="mb-6 text-6xl">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: 1 }}
                    className="inline-block"
                  >
                    ✅
                  </motion.span>
                </div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                  Registration Successful!
                </h2>
                <p className="text-gray-400 mb-6">Your registration ID: <span className="font-mono text-white">{registrationId}</span></p>
                <p className="text-lg text-gray-300 mb-8">
                  Awaiting Payment Verification
                </p>
                <div className="p-6 rounded-lg bg-white/5 border border-white/10 mb-8">
                  <p className="text-sm text-gray-400">You will receive a confirmation email once payment is verified.</p>
                </div>
                <a
                  href="/"
                  className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition transform hover:scale-105 font-semibold"
                >
                  Back to Home
                </a>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default WIP;

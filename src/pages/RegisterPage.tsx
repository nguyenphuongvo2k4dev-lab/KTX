import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, lang, setLang, showToast } = useStore();

  // Form states
  const [activeStep, setActiveStep] = useState<number>(1);
  const [university, setUniversity] = useState('bk');
  const [studentId, setStudentId] = useState('24120892');
  const [checkingStudent, setCheckingStudent] = useState(false);
  const [studentVerified, setStudentVerified] = useState(true);
  const [cccd, setCccd] = useState('079204018992');
  const [fullName, setFullName] = useState('NGUYỄN HOÀNG NAM');
  const [birthDate, setBirthDate] = useState('18/09/2006');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  // Group 2 states
  const [email, setEmail] = useState('nam.nh24@student.edu.vn');
  const [phone, setPhone] = useState('0987 654 321');
  const [otpCount, setOtpCount] = useState<number>(58);
  const [otpRunning, setOtpRunning] = useState<boolean>(true);
  const [otpDigits, setOtpDigits] = useState<string[]>(['5', '8', '2', '9', '4', '1']);
  const [password, setPassword] = useState('VnuDorm#2024Secure');
  const [confirmPassword, setConfirmPassword] = useState('VnuDorm#2024Secure');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Group 3 states
  const [dormArea, setDormArea] = useState<'A' | 'B' | 'C'>('B');
  const [roomType, setRoomType] = useState('6-ac');
  const [priorityPolicies, setPriorityPolicies] = useState<{ [key: string]: boolean }>({
    poor: false,
    remote: false,
    martyr: false,
    none: true,
  });
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [agreeNotify, setAgreeNotify] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // OTP Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpRunning && otpCount > 0) {
      timer = setInterval(() => {
        setOtpCount((prev) => {
          if (prev <= 1) {
            setOtpRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpRunning, otpCount]);

  const handleSendOtp = () => {
    setOtpCount(60);
    setOtpRunning(true);
    showToast('Đã gửi mã xác thực OTP 6 số đến ' + phone);
  };

  const handleCheckStudent = () => {
    if (!studentId.trim()) {
      showToast('Vui lòng nhập Mã số sinh viên trước khi kiểm tra.');
      return;
    }
    setCheckingStudent(true);
    setTimeout(() => {
      setCheckingStudent(false);
      setStudentVerified(true);
      if (studentId === '24120892') {
        setFullName('NGUYỄN HOÀNG NAM');
        setCccd('079204018992');
        setEmail('nam.nh24@student.edu.vn');
      } else {
        setFullName('TRẦN MINH QUÂN');
        setCccd('079205001234');
        setEmail(`${studentId.toLowerCase()}@student.edu.vn`);
      }
      showToast('Đã đối soát thành công dữ liệu tuyển sinh ĐHQG K24');
    }, 700);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const newDigits = [...otpDigits];
    newDigits[index] = val;
    setOtpDigits(newDigits);

    // Auto focus next input if digit typed
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSaveDraft = () => {
    const draft = {
      university,
      studentId,
      cccd,
      fullName,
      birthDate,
      gender,
      email,
      phone,
      dormArea,
      roomType,
    };
    try {
      localStorage.setItem('smartdorm_registration_draft', JSON.stringify(draft));
      showToast('Đã lưu bản nháp hồ sơ thành công vào bộ nhớ trình duyệt.');
    } catch {
      showToast('Bản nháp đã được lưu.');
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!agreeTerms) {
      alert('Vui lòng đọc và tích chọn đồng ý tuân thủ Nội quy Ký túc xá ĐHQG.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Mật khẩu và xác nhận mật khẩu chưa trùng khớp.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmittedSuccess(true);
      login('student', studentId || '24120892');
      showToast('Kích hoạt tài khoản và nộp hồ sơ KTX K24 thành công!');
      setTimeout(() => {
        navigate('/student/overview');
      }, 1000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-on-surface relative flex flex-col justify-between selection:bg-primary-fixed selection:text-primary">
      {/* Background ambient orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[18%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-surface-container opacity-70 blur-3xl" />
        <div className="absolute top-[35%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-surface-variant opacity-50 blur-3xl" />
        <div className="absolute -bottom-[20%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-surface-container-high opacity-60 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#1d4ed8_0.6px,transparent_0.6px)] [background-size:24px_24px] opacity-[0.035]" />
      </div>

      {/* Header */}
      <header className="relative z-20 w-full bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/30">
        <div className="h-16 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/login" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-sm group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">apartment</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold text-primary tracking-tight">SmartDorm</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-primary-fixed text-primary text-[10px] font-bold">
                    VNU
                  </span>
                </div>
                <span className="text-[11px] text-on-surface-variant hidden sm:inline">
                  Đại học Quốc gia
                </span>
              </div>
            </Link>

            <div className="hidden md:block w-px h-6 bg-surface-container-highest" />

            <div className="hidden md:flex items-center gap-1 text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px] text-secondary">account_balance</span>
              <span className="text-xs font-semibold">Cổng Quản lý Ký túc xá Số</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              className="hidden sm:flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-xs"
              href="tel:02437547890"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">support_agent</span>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-outline">Hotline hỗ trợ</span>
                <span className="font-mono text-xs text-on-surface font-semibold">024 3754 7890</span>
              </div>
            </a>

            {/* Language Switcher */}
            <div className="flex items-center bg-surface-container-low rounded-lg p-0.5 border border-outline-variant/30">
              <button
                onClick={() => setLang('VIE')}
                className={`px-2.5 py-1 rounded-md text-xs transition-all flex items-center gap-1 ${
                  lang === 'VIE'
                    ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
                    : 'text-on-surface-variant font-medium'
                }`}
                type="button"
              >
                <span>VIE</span>
              </button>
              <button
                onClick={() => setLang('ENG')}
                className={`px-2.5 py-1 rounded-md text-xs transition-all flex items-center gap-1 ${
                  lang === 'ENG'
                    ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
                    : 'text-on-surface-variant font-medium'
                }`}
                type="button"
              >
                <span>ENG</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 w-full flex-1 flex items-center justify-center py-8 px-4 md:px-6 lg:px-8">
        <div className="flex flex-col w-full max-w-5xl mx-auto space-y-6">
          {/* Progress Stepper */}
          <div className="w-full bg-surface-container-lowest rounded-2xl p-4 sm:p-6 shadow-xs border border-outline-variant/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
              {/* Step 1 */}
              <div
                onClick={() => setActiveStep(1)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  activeStep === 1
                    ? 'bg-surface-container-low border border-primary/30'
                    : 'bg-surface opacity-80 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-xs ${
                    activeStep === 1
                      ? 'bg-primary text-on-primary'
                      : 'bg-primary/20 text-primary'
                  }`}
                >
                  1
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                      {activeStep === 1 ? 'Bước 1 • Đang thực hiện' : 'Bước 1'}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-on-surface truncate">Xác thực danh tính</p>
                  <p className="text-xs text-on-surface-variant truncate">Dữ liệu học vụ & tài khoản</p>
                </div>
              </div>

              {/* Step 2 */}
              <div
                onClick={() => setActiveStep(2)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  activeStep === 2
                    ? 'bg-surface-container-low border border-primary/30'
                    : 'bg-surface opacity-80 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                    activeStep === 2
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-variant text-on-surface-variant'
                  }`}
                >
                  2
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-outline uppercase tracking-wider">
                    {activeStep === 2 ? 'Bước 2 • Đang thực hiện' : 'Bước 2'}
                  </span>
                  <p className="text-sm font-bold text-on-surface truncate">Bảo mật & MFA</p>
                  <p className="text-xs text-on-surface-variant truncate">Xác thực 2 lớp VNU-ID</p>
                </div>
              </div>

              {/* Step 3 */}
              <div
                onClick={() => setActiveStep(3)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  activeStep === 3
                    ? 'bg-surface-container-low border border-primary/30'
                    : 'bg-surface opacity-80 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                    activeStep === 3
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-variant text-on-surface-variant'
                  }`}
                >
                  3
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-outline uppercase tracking-wider">
                    {activeStep === 3 ? 'Bước 3 • Đang thực hiện' : 'Bước 3'}
                  </span>
                  <p className="text-sm font-bold text-on-surface truncate">Đăng ký phòng lưu trú</p>
                  <p className="text-xs text-on-surface-variant truncate">Hồ sơ & xếp phòng tự động</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Card Form */}
          <div className="w-full bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 p-6 sm:p-8 space-y-8">
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-primary text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">school</span>
                  <span>Năm học 2024 - 2025</span>
                </div>
                <span className="font-mono text-xs text-secondary bg-secondary-fixed/50 px-3 py-1 rounded-full font-semibold">
                  Cổng tuyển sinh trực tuyến VNU-KTX
                </span>
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
                  Kích Hoạt Tài Khoản & Đăng Ký Lưu Trú KTX K24
                </h1>
                <p className="text-xs sm:text-sm text-on-surface-variant">
                  Dành cho tân sinh viên và sinh viên ĐHQG chưa có tài khoản KTX SmartDorm chính thức.
                </p>
              </div>

              {/* Alert Notice Banner */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-container-low border border-primary/20">
                <span className="material-symbols-outlined text-primary text-[22px] shrink-0 mt-0.5">
                  info
                </span>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-primary font-bold">
                    Lưu ý nhập liệu đối soát hồ sơ
                  </p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Sinh viên khóa mới cần chuẩn bị Mã số sinh viên (MSSV) và Số CMND/CCCD khớp với dữ liệu tuyển sinh đã nhập học để được tự động trích xuất thông tin.
                  </p>
                </div>
              </div>
            </div>

            {/* Registration Multi-Section Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* GROUP 1: Academic Identity */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-2 bg-gradient-to-r from-primary/10 via-transparent to-transparent p-3 rounded-xl border-l-4 border-primary">
                  <span className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center text-sm font-bold shadow-xs">
                    1
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-on-surface">
                      Thông tin định danh học vụ
                    </h2>
                    <p className="text-xs text-on-surface-variant">
                      Xác thực với Cơ sở Dữ liệu Đào tạo ĐHQG
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Trường thành viên */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="block text-xs font-bold text-on-surface" htmlFor="university-select">
                      Trường thành viên / Khoa trực thuộc <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="university-select"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        className="w-full h-11 px-3.5 pr-10 bg-surface-container-low rounded-xl text-xs sm:text-sm text-on-surface appearance-none focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary border border-outline-variant/30"
                      >
                        <option value="">-- Chọn Trường thành viên ĐHQG --</option>
                        <option value="bk">Trường Đại học Bách Khoa (HCMUT)</option>
                        <option value="khtn">Trường Đại học Khoa học Tự nhiên (HCMUS)</option>
                        <option value="khxhnv">Trường Đại học Khoa học Xã hội & Nhân văn (USSH)</option>
                        <option value="qt">Trường Đại học Quốc Tế (IU)</option>
                        <option value="cntt">Trường Đại học Công nghệ Thông tin (UIT)</option>
                        <option value="ktl">Trường Đại học Kinh tế - Luật (UEL)</option>
                        <option value="yk">Khoa Y - ĐHQG TP.HCM</option>
                      </select>
                      <span className="material-symbols-outlined pointer-events-none absolute right-3 top-2.5 text-on-surface-variant text-[20px]">
                        keyboard_arrow_down
                      </span>
                    </div>
                  </div>

                  {/* MSSV & API Check Button */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-on-surface" htmlFor="student-id">
                      Mã số sinh viên (MSSV) <span className="text-error">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          id="student-id"
                          type="text"
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                          placeholder="Ví dụ: 24120892"
                          className="w-full h-11 px-3.5 bg-surface-container-low rounded-xl font-mono text-xs sm:text-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary border border-outline-variant/30 font-semibold"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleCheckStudent}
                        disabled={checkingStudent}
                        className="px-4 h-11 rounded-xl bg-surface-variant hover:bg-surface-dim text-primary text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
                      >
                        {checkingStudent ? (
                          <>
                            <span className="material-symbols-outlined text-[18px] animate-spin">
                              refresh
                            </span>
                            <span>Đang đối soát...</span>
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-[18px]">verified</span>
                            <span>Kiểm tra dữ liệu</span>
                          </>
                        )}
                      </button>
                    </div>
                    {studentVerified && (
                      <p className="text-[11px] text-emerald-600 flex items-center gap-1 font-semibold mt-1">
                        <span className="material-symbols-outlined text-[15px]">check_circle</span>
                        <span>Dữ liệu hợp lệ: Đã tìm thấy hồ sơ tuyển sinh K24</span>
                      </p>
                    )}
                  </div>

                  {/* CCCD / Hộ chiếu */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-on-surface" htmlFor="id-number">
                      Số CCCD / Hộ chiếu (12 số) <span className="text-error">*</span>
                    </label>
                    <input
                      id="id-number"
                      type="text"
                      value={cccd}
                      onChange={(e) => setCccd(e.target.value)}
                      placeholder="Nhập số CCCD gắn chip"
                      className="w-full h-11 px-3.5 bg-surface-container-low rounded-xl font-mono text-xs sm:text-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary border border-outline-variant/30"
                    />
                    <p className="text-[11px] text-on-surface-variant">Khớp với giấy báo trúng tuyển đại học</p>
                  </div>

                  {/* Họ và tên (Auto-sync) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-on-surface" htmlFor="full-name">
                        Họ và tên sinh viên <span className="text-error">*</span>
                      </label>
                      <span className="text-[11px] text-secondary flex items-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-[13px]">lock_reset</span> Đồng bộ tự động
                      </span>
                    </div>
                    <input
                      id="full-name"
                      type="text"
                      readOnly
                      value={fullName}
                      className="w-full h-11 px-3.5 bg-surface-container font-bold text-sm text-on-surface rounded-xl cursor-not-allowed uppercase border border-outline-variant/30"
                    />
                  </div>

                  {/* Ngày sinh & Giới tính */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-on-surface" htmlFor="birth-date">
                        Ngày sinh <span className="text-error">*</span>
                      </label>
                      <input
                        id="birth-date"
                        type="text"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        placeholder="DD/MM/YYYY"
                        className="w-full h-11 px-3.5 bg-surface-container-low rounded-xl text-xs sm:text-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary border border-outline-variant/30"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-on-surface">
                        Giới tính <span className="text-error">*</span>
                      </label>
                      <div className="flex items-center gap-3 h-11 px-3 bg-surface-container-low rounded-xl border border-outline-variant/30">
                        <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-on-surface">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={gender === 'male'}
                            onChange={() => setGender('male')}
                            className="w-4 h-4 text-primary focus:ring-primary"
                          />
                          <span>Nam</span>
                        </label>
                        <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-on-surface">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === 'female'}
                            onChange={() => setGender('female')}
                            className="w-4 h-4 text-primary focus:ring-primary"
                          />
                          <span>Nữ</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* GROUP 2: Account & Security Credentials */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-2 bg-gradient-to-r from-primary/10 via-transparent to-transparent p-3 rounded-xl border-l-4 border-primary">
                  <span className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center text-sm font-bold shadow-xs">
                    2
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-on-surface">
                      Thông tin liên hệ & Thiết lập tài khoản SmartDorm
                    </h2>
                    <p className="text-xs text-on-surface-variant">
                      Thông tin nhận mã định danh và đăng nhập quản lý phòng
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Student Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-on-surface" htmlFor="student-email">
                      Email sinh viên ĐHQG <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="student-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="mssv@student.edu.vn"
                        className="w-full h-11 px-3.5 pl-9 bg-surface-container-low rounded-xl text-xs sm:text-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary border border-outline-variant/30"
                      />
                      <span className="material-symbols-outlined absolute left-2.5 top-3 text-on-surface-variant text-[18px]">
                        mail
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant">Hệ thống gửi thư xác thực vào hòm thư này</p>
                  </div>

                  {/* Phone number & OTP */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-on-surface" htmlFor="student-phone">
                      Số điện thoại di động nhận OTP <span className="text-error">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          id="student-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="09xx xxx xxx"
                          className="w-full h-11 px-3.5 pl-9 bg-surface-container-low rounded-xl font-mono text-xs sm:text-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary border border-outline-variant/30"
                        />
                        <span className="material-symbols-outlined absolute left-2.5 top-3 text-on-surface-variant text-[18px]">
                          phone_iphone
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={otpRunning && otpCount > 0}
                        className={`px-3.5 h-11 rounded-xl text-xs font-bold transition-colors shrink-0 shadow-xs ${
                          otpRunning && otpCount > 0
                            ? 'bg-primary-fixed text-primary cursor-not-allowed opacity-80'
                            : 'bg-primary text-white hover:bg-on-primary-fixed-variant'
                        }`}
                      >
                        {otpRunning && otpCount > 0 ? `Gửi lại (${otpCount}s)` : 'Gửi mã OTP'}
                      </button>
                    </div>
                    <p className="text-[11px] text-on-surface-variant">
                      Dùng để kích hoạt phòng và thông báo cúp điện/nước
                    </p>
                  </div>

                  {/* OTP Input Matrix */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="block text-xs font-bold text-on-surface">
                      Nhập mã xác thực OTP 6 chữ số <span className="text-error">*</span>
                    </label>
                    <div className="flex items-center gap-2 sm:gap-3 max-w-sm">
                      {otpDigits.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-input-${idx}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          className="w-11 sm:w-12 h-12 text-center text-lg sm:text-xl font-bold bg-surface-container-low rounded-xl text-primary focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none border border-outline-variant/30 shadow-xs"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-on-surface" htmlFor="new-password">
                      Mật khẩu đăng nhập mới <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="new-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-11 px-3.5 pl-9 pr-10 bg-surface-container-low rounded-xl text-xs sm:text-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary border border-outline-variant/30"
                      />
                      <span className="material-symbols-outlined absolute left-2.5 top-3 text-on-surface-variant text-[18px]">
                        key
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant text-[18px] hover:text-on-surface"
                      >
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </button>
                    </div>

                    {/* Password Strength Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-on-surface-variant">Độ bảo mật:</span>
                        <span className="text-secondary font-bold">Rất mạnh (Khuyên dùng)</span>
                      </div>
                      <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden flex gap-1">
                        <div className="h-full w-1/4 bg-emerald-500 rounded-full" />
                        <div className="h-full w-1/4 bg-emerald-500 rounded-full" />
                        <div className="h-full w-1/4 bg-emerald-500 rounded-full" />
                        <div className="h-full w-1/4 bg-emerald-500 rounded-full" />
                      </div>
                      <p className="text-[10px] text-on-surface-variant">
                        Tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
                      </p>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-on-surface" htmlFor="confirm-password">
                      Xác nhận mật khẩu mới <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full h-11 px-3.5 pl-9 pr-10 bg-surface-container-low rounded-xl text-xs sm:text-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary border border-outline-variant/30"
                      />
                      <span className="material-symbols-outlined absolute left-2.5 top-3 text-on-surface-variant text-[18px]">
                        lock
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant text-[18px] hover:text-on-surface"
                      >
                        {showConfirmPassword ? 'visibility_off' : 'visibility'}
                      </button>
                    </div>
                    {password && confirmPassword && (
                      <p
                        className={`text-[11px] flex items-center gap-1 font-semibold ${
                          password === confirmPassword ? 'text-emerald-600' : 'text-error'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {password === confirmPassword ? 'check' : 'close'}
                        </span>
                        <span>{password === confirmPassword ? 'Khớp mật khẩu' : 'Mật khẩu chưa khớp'}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* GROUP 3: Initial Dormitory Preferences */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-2 bg-gradient-to-r from-primary/10 via-transparent to-transparent p-3 rounded-xl border-l-4 border-primary">
                  <span className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center text-sm font-bold shadow-xs">
                    3
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-on-surface">
                      Nguyện vọng lưu trú ban đầu
                    </h2>
                    <p className="text-xs text-on-surface-variant">
                      Thông tin để Hội đồng Quản lý Ký túc xá phân bổ tòa nhà và loại giường phù hợp
                    </p>
                  </div>
                </div>

                {/* Campus Selection (Cards) */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-on-surface">
                    Chọn Phân khu Ký túc xá mong muốn <span className="text-error">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Khu A */}
                    <div
                      onClick={() => setDormArea('A')}
                      className={`relative flex flex-col p-4 rounded-xl cursor-pointer transition-all border ${
                        dormArea === 'A'
                          ? 'bg-primary-fixed/30 border-primary shadow-xs'
                          : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${dormArea === 'A' ? 'text-primary' : 'text-on-surface'}`}>
                          Khu A - Linh Trung
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            dormArea === 'A' ? 'bg-primary text-white' : 'bg-surface border border-outline-variant'
                          }`}
                        >
                          {dormArea === 'A' && <span className="material-symbols-outlined text-[14px]">check</span>}
                        </div>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                        Khuôn viên trung tâm, gần ĐH Bách Khoa, KHTN, thư viện trung tâm ĐHQG.
                      </p>
                      <span className="mt-3 text-[11px] text-secondary font-bold">
                        Cơ bản tiêu chuẩn • Nhiều cây xanh
                      </span>
                    </div>

                    {/* Khu B (Active selection) */}
                    <div
                      onClick={() => setDormArea('B')}
                      className={`relative flex flex-col p-4 rounded-xl cursor-pointer transition-all border ${
                        dormArea === 'B'
                          ? 'bg-primary-fixed/30 border-primary shadow-xs'
                          : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-sm font-bold ${dormArea === 'B' ? 'text-primary' : 'text-on-surface'}`}>
                            Khu B - Tân Lập
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold">
                            Phổ biến
                          </span>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            dormArea === 'B' ? 'bg-primary text-white' : 'bg-surface border border-outline-variant'
                          }`}
                        >
                          {dormArea === 'B' && <span className="material-symbols-outlined text-[14px]">check</span>}
                        </div>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                        Tòa nhà hiện đại, gần ĐH Công nghệ Thông tin, Kinh tế Luật và trạm Metro.
                      </p>
                      <span className="mt-3 text-[11px] text-primary font-bold">
                        Tích hợp điều hòa • Thang máy tốc độ cao
                      </span>
                    </div>

                    {/* Khu C */}
                    <div
                      onClick={() => setDormArea('C')}
                      className={`relative flex flex-col p-4 rounded-xl cursor-pointer transition-all border ${
                        dormArea === 'C'
                          ? 'bg-primary-fixed/30 border-primary shadow-xs'
                          : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${dormArea === 'C' ? 'text-primary' : 'text-on-surface'}`}>
                          Khu C - Sau đại học
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            dormArea === 'C' ? 'bg-primary text-white' : 'bg-surface border border-outline-variant'
                          }`}
                        >
                          {dormArea === 'C' && <span className="material-symbols-outlined text-[14px]">check</span>}
                        </div>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                        Dành cho học viên cao học, nghiên cứu sinh và lưu học sinh quốc tế.
                      </p>
                      <span className="mt-3 text-[11px] text-outline font-bold">
                        Không gian yên tĩnh độc lập
                      </span>
                    </div>
                  </div>
                </div>

                {/* Room Types & Priority Groups */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                  {/* Loại phòng */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-on-surface" htmlFor="room-type">
                      Loại phòng đăng ký ưu tiên <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="room-type"
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        className="w-full h-11 px-3.5 pr-10 bg-surface-container-low rounded-xl text-xs sm:text-sm text-on-surface appearance-none focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary border border-outline-variant/30"
                      >
                        <option value="4-ac">Phòng 4 sinh viên (Có máy lạnh, WC khép kín - 650.000đ/tháng)</option>
                        <option value="6-ac">Phòng 6 sinh viên (Có máy lạnh, WC khép kín - 480.000đ/tháng)</option>
                        <option value="8-fan">Phòng 8 sinh viên (Quạt trần tiêu chuẩn - 280.000đ/tháng)</option>
                        <option value="2-service">Phòng 2 sinh viên (Dịch vụ cao cấp khép kín - 1.250.000đ/tháng)</option>
                      </select>
                      <span className="material-symbols-outlined pointer-events-none absolute right-3 top-3 text-on-surface-variant text-[20px]">
                        keyboard_arrow_down
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant">
                      Chi phí chưa bao gồm tiền định mức điện nước thực tế phát sinh.
                    </p>
                  </div>

                  {/* Priority Policy Category */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-on-surface">
                      Đối tượng chính sách được ưu tiên xét duyệt
                    </label>
                    <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-3 rounded-xl border border-outline-variant/30">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-on-surface font-medium">
                        <input
                          type="checkbox"
                          checked={priorityPolicies.poor}
                          onChange={(e) =>
                            setPriorityPolicies({ ...priorityPolicies, poor: e.target.checked, none: false })
                          }
                          className="w-4 h-4 rounded text-primary focus:ring-primary"
                        />
                        <span>Hộ nghèo / cận nghèo</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-on-surface font-medium">
                        <input
                          type="checkbox"
                          checked={priorityPolicies.remote}
                          onChange={(e) =>
                            setPriorityPolicies({ ...priorityPolicies, remote: e.target.checked, none: false })
                          }
                          className="w-4 h-4 rounded text-primary focus:ring-primary"
                        />
                        <span>Vùng sâu, vùng xa</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-on-surface font-medium">
                        <input
                          type="checkbox"
                          checked={priorityPolicies.martyr}
                          onChange={(e) =>
                            setPriorityPolicies({ ...priorityPolicies, martyr: e.target.checked, none: false })
                          }
                          className="w-4 h-4 rounded text-primary focus:ring-primary"
                        />
                        <span>Con thương binh, liệt sĩ</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-on-surface font-medium">
                        <input
                          type="checkbox"
                          checked={priorityPolicies.none}
                          onChange={(e) =>
                            setPriorityPolicies({
                              poor: false,
                              remote: false,
                              martyr: false,
                              none: e.target.checked,
                            })
                          }
                          className="w-4 h-4 rounded text-primary focus:ring-primary"
                        />
                        <span>Không diện ưu tiên</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Campus Life Visual Insight Card */}
              <div className="w-full bg-surface-container-low rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row items-center gap-5 border border-outline-variant/30">
                <div
                  className="w-full md:w-48 h-32 rounded-xl bg-cover bg-center shrink-0 shadow-xs bg-slate-800"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBVk_3gHG0Ih1HJaTd1fmgrTLtMr4NmWeXI-M4cgO2dx06inRkej2nBWH7BUr4vpiYf4rpn0Sa16qpokP-iQpPuCaG7iLOGVf4-LqCyu_r47Fo-Q7FrgMFUxAjS3GdACzxS63W3voMeVIUi046JVh3EV52MNRIERLQNnVLlX5HkLr9WX5vCVHuXtx9lfjZKR6w5rxQO078Sism_Pum18iwhJJSPN5L6XXauIhQZxCwgAtZ5AgSP-CynFg')",
                  }}
                />
                <div className="space-y-1.5 flex-1">
                  <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold">
                    <span className="material-symbols-outlined text-[16px]">apartment</span>
                    <span>Không gian sống tiện ích tại KTX Đại học Quốc gia</span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-on-surface">
                    Hệ sinh thái thông minh 24/7 phục vụ việc học tập & rèn luyện
                  </p>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Mỗi phòng được trang bị thẻ từ bảo mật, hệ thống cảm biến báo khói, wifi mesh tốc độ cao toàn khu và khu vực giặt sấy tự động tích hợp ví thanh toán sinh viên.
                  </p>
                </div>
              </div>

              {/* Commitment & Terms of Service */}
              <div className="space-y-3 p-4 rounded-xl bg-surface-container-high/60 border border-outline-variant/30">
                <div className="flex items-start gap-3">
                  <input
                    id="terms-agree"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary shrink-0"
                  />
                  <label
                    htmlFor="terms-agree"
                    className="text-xs sm:text-sm text-on-surface cursor-pointer select-none leading-relaxed"
                  >
                    Tôi cam kết các thông tin khai báo trên là hoàn toàn chính xác và đồng ý tuân thủ toàn bộ{' '}
                    <a className="text-primary font-bold underline underline-offset-2 hover:opacity-80" href="#rules">
                      Nội quy Sinh viên Ký túc xá Đại học Quốc gia
                    </a>.
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <input
                    id="notify-agree"
                    type="checkbox"
                    checked={agreeNotify}
                    onChange={(e) => setAgreeNotify(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary shrink-0"
                  />
                  <label
                    htmlFor="notify-agree"
                    className="text-xs sm:text-sm text-on-surface cursor-pointer select-none leading-relaxed"
                  >
                    Đồng ý nhận thông báo điện tử về hóa đơn điện nước, kết quả xếp phòng tự động và lịch nhận bàn giao giường qua ứng dụng KTX SmartDorm, Zalo và Email sinh viên.
                  </label>
                </div>
              </div>

              {/* Form Actions & Submission */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <Link
                  to="/login"
                  className="text-xs sm:text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  <span>
                    Đã có tài khoản KTX? <strong className="text-primary underline">Đăng nhập ngay</strong>
                  </span>
                </Link>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="hidden sm:inline-flex px-5 h-12 rounded-xl bg-surface-container hover:bg-surface-variant text-on-surface text-xs font-bold transition-colors border border-outline-variant/30"
                  >
                    Lưu bản nháp
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-6 h-12 rounded-xl bg-primary hover:bg-on-primary-fixed-variant active:bg-on-primary-fixed text-on-primary text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 group"
                  >
                    {submitting ? (
                      <>
                        <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                        <span>Đang xử lý hồ sơ...</span>
                      </>
                    ) : submittedSuccess ? (
                      <>
                        <span className="material-symbols-outlined text-[20px]">check</span>
                        <span>Đã hoàn tất kích hoạt</span>
                      </>
                    ) : (
                      <>
                        <span>Tiếp tục: Hoàn tất Kích hoạt & Nộp hồ sơ</span>
                        <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                          arrow_forward
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Help & Support Badge Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-on-surface-variant text-xs pb-4">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[18px]">security</span>
              <span>Dữ liệu mã hóa kết nối SSL/TLS 256-bit</span>
            </div>
            <span className="text-outline-variant hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">help_center</span>
              <span>
                Hỗ trợ kỹ thuật: <strong>hotro@ktx.vnuhcm.edu.vn</strong>
              </span>
            </div>
            <span className="text-outline-variant hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[18px]">schedule</span>
              <span>Thời gian mở cổng đăng ký: 01/08 - 25/08/2024</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 w-full bg-surface-container-low/90 backdrop-blur-md py-4 border-t border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-on-surface-variant">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span>© 2024 Trung tâm Quản trị KTX - Đại học Quốc gia.</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1 text-secondary font-medium">
              <span className="material-symbols-outlined text-[15px]">verified_user</span>
              <span>Bảo mật chuẩn ISO/IEC 27001:2022</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a className="hover:text-primary transition-colors" href="#rules">
              Quy chế Ký túc xá
            </a>
            <span>•</span>
            <a className="hover:text-primary transition-colors" href="#privacy">
              Chính sách bảo mật
            </a>
            <span>•</span>
            <a className="hover:text-primary transition-colors" href="#vnu-id">
              Hướng dẫn kích hoạt VNU-ID
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

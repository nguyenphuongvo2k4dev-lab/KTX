import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, lang, setLang } = useStore();

  const [authTab, setAuthTab] = useState<'form' | 'qr'>('form');
  const [identifier, setIdentifier] = useState('22120045');
  const [password, setPassword] = useState('smartdorm@2024');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!identifier || !password) {
      alert('Vui lòng nhập đầy đủ thông tin tài khoản và mật khẩu.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login('student', identifier);
      setLoading(false);
      navigate('/student/overview');
    }, 600);
  };

  const handleVnuSso = () => {
    setLoading(true);
    setTimeout(() => {
      login('student', 'sso.user@vnu.edu.vn');
      setLoading(false);
      navigate('/student/overview');
    }, 600);
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
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-sm">
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
            </div>

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
      <main className="relative z-10 w-full flex-1 flex items-center justify-center py-6 sm:py-10 px-4 md:px-6 lg:px-8">
        <div className="flex flex-col w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* LEFT COLUMN: Brand Showcase & Institutional Trust (5 cols on lg) */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-surface-container-low p-6 lg:p-8 relative overflow-hidden shadow-xs border border-outline-variant/30">
              {/* Decorative Backdrop Glow */}
              <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary-fixed opacity-40 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-secondary-fixed opacity-30 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col space-y-6">
                {/* Live Announcement Pill */}
                <div className="flex items-start gap-2.5 bg-surface-container-lowest/90 backdrop-blur-xs p-3 rounded-xl shadow-xs border border-outline-variant/30">
                  <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
                    campaign
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-primary font-bold tracking-wider">
                      Thông báo kỳ lưu trú mới
                    </span>
                    <p className="text-xs text-on-surface leading-tight mt-0.5">
                      Cổng đăng ký gia hạn phòng lưu trú Học kỳ 2 mở từ{' '}
                      <span className="font-mono font-semibold text-primary">25/10</span> đến{' '}
                      <span className="font-mono font-semibold text-primary">05/11/2024</span>.
                    </p>
                  </div>
                </div>

                {/* System Narrative & Headline */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-primary text-xs font-semibold">
                    <span className="material-symbols-outlined text-[15px]">verified</span>
                    <span>VNU-SmartDorm Ecosystem 4.0</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight leading-tight">
                    Hệ sinh thái Ký túc xá Đại học Thông minh
                  </h1>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Nền tảng số hóa toàn diện dành cho cư dân KTX ĐHQG: quản lý phòng ở, kết nối dịch vụ tiện ích thông minh và đồng bộ hồ sơ lưu trú theo thời gian thực.
                  </p>
                </div>

                {/* Visual Hero Image Container */}
                <div className="relative w-full h-44 rounded-xl overflow-hidden shadow-xs border border-outline-variant/30 group">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105 bg-slate-800 flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-tr from-primary/80 via-primary/40 to-secondary-container/60 flex items-center justify-center p-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className="material-symbols-outlined text-white text-[44px] mb-1">
                          apartment
                        </span>
                        <span className="text-white font-bold text-sm tracking-wide">
                          Ký túc xá Đại học Quốc gia TP.HCM
                        </span>
                        <span className="text-white/80 text-xs">Khu Đô thị ĐHQG - Thành phố Thủ Đức</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/30 to-transparent flex items-end p-4">
                    <div className="flex items-center justify-between w-full text-white text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-semibold">Khu nội trú KTX Khu B • 98.4% Tỷ lệ lấp đầy</span>
                      </div>
                      <span className="font-mono text-primary-fixed font-semibold">12.450 Cư dân</span>
                    </div>
                  </div>
                </div>

                {/* Key Feature Highlights */}
                <div className="grid grid-cols-1 gap-2.5 pt-1">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-lowest/80 backdrop-blur-xs shadow-xs border border-outline-variant/20">
                    <div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-on-surface truncate">
                        Quản lý hợp đồng điện tử & check-in tự động
                      </span>
                      <span className="text-[11px] text-on-surface-variant truncate">
                        Ký số xác thực bảo mật qua căn cước VNeID
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-lowest/80 backdrop-blur-xs shadow-xs border border-outline-variant/20">
                    <div className="w-9 h-9 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                      <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-on-surface truncate">
                        Giám sát điện nước IoT & VietQR tức thì
                      </span>
                      <span className="text-[11px] text-on-surface-variant truncate">
                        Cập nhật chỉ số tự động, gạch nợ tức thì 24/7
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-lowest/80 backdrop-blur-xs shadow-xs border border-outline-variant/20">
                    <div className="w-9 h-9 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0">
                      <span className="material-symbols-outlined text-[20px]">engineering</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-on-surface truncate">
                        Báo hỏng kỹ thuật SLA phản hồi 5 phút
                      </span>
                      <span className="text-[11px] text-on-surface-variant truncate">
                        Kỹ thuật viên túc trực tại từng tòa nhà
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-lowest/80 backdrop-blur-xs shadow-xs border border-outline-variant/20">
                    <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[20px]">passkey</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-on-surface truncate">
                        Khóa phòng FaceID & Thẻ sinh viên RFID
                      </span>
                      <span className="text-[11px] text-on-surface-variant truncate">
                        Kiểm soát an ninh ra vào cổng thông minh
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="relative z-10 pt-4 mt-4 flex flex-wrap items-center justify-between gap-3 text-on-surface-variant text-xs border-t border-outline-variant/20">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-primary">security</span>
                  <span className="font-semibold">ISO/IEC 27001:2022</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-secondary">database</span>
                  <span>Đồng bộ CSDL ĐHQG</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: High-Fidelity Login Interface (7 cols on lg) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs border border-outline-variant/30 relative">
                {/* Header & Role Selector */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
                        Cổng Xác thực Cư dân
                      </h2>
                      <p className="text-xs text-on-surface-variant">
                        Vui lòng đăng nhập để truy cập dịch vụ lưu trú nội trú KTX
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 self-start sm:self-auto bg-surface-container-low px-2.5 py-1 rounded-full border border-outline-variant/30">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-[11px] font-semibold text-on-surface-variant">Hệ thống sẵn sàng</span>
                    </div>
                  </div>

                  {/* Portal Badge & Registration Prompt */}
                  <div className="p-3 rounded-xl bg-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-outline-variant/30">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-xs shadow-xs">
                        <span className="material-symbols-outlined text-[18px]">school</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-on-surface">Cổng Sinh Viên Nội Trú</span>
                        <span className="text-[11px] text-on-surface-variant">Xác thực tài khoản lưu trú KTX</span>
                      </div>
                    </div>

                    <Link
                      to="/register"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold shadow-xs hover:bg-on-primary-fixed-variant transition-colors self-start sm:self-auto"
                    >
                      <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                      <span>Đăng ký lưu trú K24</span>
                    </Link>
                  </div>
                </div>

                {/* VNU SSO Button */}
                <div className="mt-5">
                  <button
                    onClick={handleVnuSso}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface transition-all shadow-xs border border-outline-variant/30 group"
                    type="button"
                  >
                    <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center text-on-primary shadow-xs shrink-0">
                      <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs sm:text-sm text-primary font-bold group-hover:translate-x-0.5 transition-transform">
                        Đăng nhập nhanh qua VNU SSO
                      </span>
                      <span className="text-[11px] text-on-surface-variant">
                        Tài khoản Định danh Đại học Quốc gia (@vnu.edu.vn)
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-primary text-[20px] ml-auto group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                </div>

                {/* Divider */}
                <div className="relative flex items-center justify-center my-5">
                  <div className="w-full h-px bg-surface-container-highest" />
                  <span className="absolute bg-surface-container-lowest px-3 text-[11px] uppercase tracking-wider text-outline font-semibold">
                    Hoặc tài khoản KTX SmartDorm
                  </span>
                </div>

                {/* Toggle Login Mode */}
                <div className="flex items-center justify-end gap-2 mb-3">
                  <button
                    onClick={() => setAuthTab('form')}
                    className={`text-xs font-semibold flex items-center gap-1 ${
                      authTab === 'form' ? 'text-primary underline' : 'text-on-surface-variant hover:text-primary'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">password</span>
                    <span>Mật khẩu</span>
                  </button>
                  <span className="text-outline-variant">•</span>
                  <button
                    onClick={() => setAuthTab('qr')}
                    className={`text-xs font-semibold flex items-center gap-1 ${
                      authTab === 'qr' ? 'text-primary underline' : 'text-on-surface-variant hover:text-primary'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
                    <span>Quét mã QR App</span>
                  </button>
                </div>

                {/* Form Mode */}
                {authTab === 'form' ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-on-surface">
                        Mã số sinh viên (MSSV) hoặc Email ĐHQG
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3 text-[18px] text-outline pointer-events-none">
                          person
                        </span>
                        <input
                          type="text"
                          required
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          placeholder="vd: 22120045 hoặc sinhvien@student.edu.vn"
                          className="w-full h-11 pl-10 pr-3 rounded-lg bg-surface-container-low text-on-surface text-xs placeholder:text-outline outline-none focus:ring-2 focus:ring-primary border border-outline-variant/30"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold text-on-surface">
                          Mật khẩu đăng nhập
                        </label>
                        <button
                          type="button"
                          onClick={() => alert('Liên hệ hotline Ban Quản lý 024 3754 7890 để cấp lại mật khẩu.')}
                          className="text-primary hover:underline font-semibold text-[11px]"
                        >
                          Quên mật khẩu?
                        </button>
                      </div>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3 text-[18px] text-outline pointer-events-none">
                          lock
                        </span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full h-11 pl-10 pr-10 rounded-lg bg-surface-container-low text-on-surface text-xs outline-none focus:ring-2 focus:ring-primary border border-outline-variant/30"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 text-outline hover:text-on-surface"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {showPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
                        />
                        <span className="text-[11px] text-on-surface">
                          Ghi nhớ đăng nhập trên thiết bị này (30 ngày)
                        </span>
                      </label>
                    </div>

                    <div className="pt-2 flex flex-col gap-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
                      >
                        {loading ? (
                          <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                        ) : (
                          <span className="material-symbols-outlined text-[20px]">login</span>
                        )}
                        <span>
                          {loading ? 'Đang xác thực hệ thống...' : 'Đăng nhập vào KTX SmartDorm'}
                        </span>
                      </button>

                      <div className="text-center pt-1">
                        <Link
                          to="/register"
                          className="text-xs text-on-surface-variant hover:text-primary transition-colors font-medium"
                        >
                          Chưa có tài khoản KTX? <strong className="text-primary underline">Đăng ký / Kích hoạt K24 ngay</strong>
                        </Link>
                      </div>
                    </div>
                  </form>
                ) : (
                  /* QR Tab */
                  <div className="flex flex-col items-center justify-center p-6 bg-surface-container-low rounded-xl text-center space-y-3 border border-outline-variant/30">
                    <div className="w-44 h-44 bg-surface-container-lowest p-2.5 rounded-xl shadow-xs flex flex-col items-center justify-center relative border border-outline-variant/30">
                      <div className="w-full h-full bg-surface-container-high rounded-lg flex items-center justify-center relative overflow-hidden">
                        <span className="material-symbols-outlined text-primary text-[80px] opacity-80">
                          qr_code_2
                        </span>
                        <div className="absolute w-9 h-9 rounded-full bg-surface-container-lowest shadow-md flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-[20px]">apartment</span>
                        </div>
                      </div>
                      <div className="absolute -bottom-2 bg-primary text-white text-[10px] px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                        <span>Cập nhật sau 45s</span>
                      </div>
                    </div>
                    <div className="max-w-xs space-y-0.5">
                      <h3 className="text-xs font-bold text-on-surface">Quét mã bằng ứng dụng SmartDorm</h3>
                      <p className="text-[11px] text-on-surface-variant">
                        Mở app VNU-SmartDorm trên điện thoại, chọn biểu tượng [Quét QR] để xác thực tức thì.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleLoginSubmit()}
                      className="text-primary text-xs font-semibold hover:underline flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
                      <span>Giả lập quét mã thành công →</span>
                    </button>
                  </div>
                )}

                {/* Freshmen Registration Banner */}
                <div className="mt-6 pt-4 bg-surface-container-low rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-outline-variant/30">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0 font-bold">
                      <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-on-surface">Tân sinh viên mới tiếp nhận?</span>
                      <span className="text-[11px] text-on-surface-variant">
                        Kích hoạt tài khoản và nộp hồ sơ xét duyệt
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/register')}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary text-xs font-bold shadow-xs hover:bg-surface-container transition-all"
                  >
                    <span>Kích hoạt ngay</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                {/* Footer Security Context */}
                <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-on-surface-variant text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">lock</span>
                    <span>Mã hóa TLS 1.3 End-to-End SSL 256-bit</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Hỗ trợ kỹ thuật:</span>
                    <a className="font-mono font-semibold text-primary hover:underline" href="tel:02437547890">
                      024 3754 7890
                    </a>
                  </div>
                </div>
              </div>
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

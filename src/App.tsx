/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Key } from 'react';
import { 
  ShieldAlert, 
  ChevronRight, 
  Phone, 
  FileText, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  BarChart3, 
  ShieldCheck, 
  Scale, 
  Mail, 
  ArrowRight,
  Plus,
  Minus,
  TrendingDown,
  Building2,
  Users,
  Briefcase,
  Gavel,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface Case {
  title: string;
  result: string;
  type: string;
  industry: string;
  detail: string;
  icon: React.ReactNode;
  tag: string;
  implication: string;
}

// --- Data ---

const STATISTICS = [
  { label: "2026년 총 재해자 수 예상", value: "142,771명+", detail: "지속적 증가 추세" },
  { label: "50인 미만 사업장 비율", value: "68.8%", detail: "중처법 전면 적용 대상" },
  { label: "사고 사망자 수 (2026)", value: "2,098명+", detail: "철저한 대비 필요" },
  { label: "최고 선고 형량", value: "징역 15년", detail: "무관용 원칙 적용" }
];

const LEGAL_CASES: Case[] = [
  {
    title: "아리셀 (Aricell) 사례",
    result: "대표이사 징역 15년 선고",
    type: "화재 및 폭발",
    industry: "리튬 일차전지 제조업",
    detail: "중대재해처벌법 시행 후 최고 형량 기록. 안전 예산 미편성 및 위험 요인 방치를 경영책임자의 실질적 의무 위반으로 판단하여 엄중 처벌.",
    implication: "안전보건관리체계가 서류상으로만 존재하고 실제 현장에서 작동하지 않을 경우 면책 불가.",
    icon: <Scale className="w-6 h-6" />,
    tag: "최고형량"
  },
  {
    title: "한국국제강 사례",
    result: "징역 1년 실형 확정 및 법정 구속",
    type: "깔림 (낙하)",
    industry: "제조업 (강관 제조)",
    detail: "과거 수차례 안전보건 조치 의무 위반 전력이 있는 원청 대표이사에게 유족 합의에도 불구하고 실형 선고 및 법정 구속.",
    implication: "반복적인 위험 지적에도 개선 노력이 미흡할 경우 합의 여부와 관계없이 실형 가능성 높음.",
    icon: <Gavel className="w-6 h-6" />,
    tag: "법정구속"
  },
  {
    title: "온유파트너스 사례",
    result: "1호 판결 - 징역 1년 6개월",
    type: "추락 (떨어짐)",
    industry: "건설업 (중소 건설사)",
    detail: "경영책임자의 실질적 이행 의무를 강조한 중처법 역사상 첫 판결. 다만 피해 보상 노력과 처벌 불원이 감경 요소로 작용하여 집행유예 선고.",
    implication: "사고 발생 후 골든타임 내의 민사상 합의와 보상 재원 마련이 형사 처벌 수위를 결정하는 핵심.",
    icon: <History className="w-6 h-6" />,
    tag: "1호 판결"
  },
  {
    title: "양산 자동차 부품 업체",
    result: "대표이사 징역 2년 선고",
    type: "끼임 (협착)",
    industry: "자동차 부품 제조업",
    detail: "반복적인 위험 요인 방치와 안전 규정 미준수로 인해 사고 발생. 법원은 안전보건관리체계의 실질적 운영 실패를 근거로 실형 선고.",
    implication: "제조업 현장에서의 기계 설비 안전 점검 및 시스템 구축은 CEO의 최우선 의무.",
    icon: <AlertCircle className="w-6 h-6" />,
    tag: "실형선고"
  }
];

const SOLUTIONS = [
  {
    id: "defense",
    title: "민사상 손해배상 & 합의금 재원",
    description: "산재 보상금은 최소한의 보상일 뿐입니다. 실제 소송 시 발생하는 수억 원의 위자료와 일실수익 차액을 위한 전용 재원을 즉시 마련하여 CEO의 형사 리스크를 최소화합니다.",
    benefits: [
      "365일 24시간 언제 어디서나 발생한 재해 사고 보장",
      "보험사고 발생 이후에도 변동 없는 보험료 (비갱신형)",
      "민사 합의를 통한 형사 처벌 감경 요소 확보"
    ],
    icon: <ShieldCheck className="w-10 h-10" />
  },
  {
    id: "efficiency",
    title: "기업 운영의 유연성과 세무 혜택",
    description: "납입 보험료 전액을 비용으로 처리하여 법인세를 절감하고, 임직원 교체 시에도 계약을 해지하지 않고 피보험자만 변경하여 관리가 용이합니다.",
    benefits: [
      "납입보험료 전액/일부 손비인정으로 법인세 절감",
      "퇴직, 이직 등을 고려한 자유로운 피보험자 변경",
      "복리후생비 처리로 기업 재무 건전성 강화"
    ],
    icon: <TrendingDown className="w-10 h-10" />
  },
  {
    id: "asset",
    title: "환급금을 활용한 기업 경영자금",
    description: "소멸성 비용이 아닙니다. 산재보험과 다르게 만기 시 환급금을 통해 CEO의 퇴직금 재원이나 기업의 시설 재투자 자금으로 전략적 활용이 가능합니다.",
    benefits: [
      "최대 100% 환급 플랜으로 경영 자금 확보",
      "사고가 없어도 목적 자금으로 유연하게 전환",
      "CEO 리스크 관리와 자산 축적의 결합"
    ],
    icon: <Briefcase className="w-10 h-10" />
  }
];

const FAQS = [
  {
    q: "직원이 입사하거나 퇴사할 때 계약을 해지해야 하나요?",
    a: "아니요. 삼성생명 기업재해보장보험은 자유로운 피보험자 교체가 가능합니다. 별도의 해지 없이 명부 관리만으로 계약을 유지할 수 있어 행정 절차가 매우 간소합니다."
  },
  {
    q: "산재보험이 있는데 별도 민간 보험이 왜 필요한가요?",
    a: "산재보험은 최소한의 요건만 보상합니다. 판례에 따르면 사고 사망 시 민사 배상액은 약 4.7억 원 수준이나 산재 보상은 1.4억 원에 불과합니다. 나머지 3.3억 원은 기업이 현금으로 배상해야 하므로 이를 위한 리스크 헤지가 필수적입니다."
  },
  {
    q: "개인사업자도 가입이 가능한가요?",
    a: "물론입니다. 중대재해처벌법 전면 시행에 따라 5인 이상 사업자라면 개인/법인 관계없이 법이 적용됩니다. 상시 근로자 5명 이상을 둔 식당, 카페, 제조업체 모두 대비가 필요합니다."
  },
  {
    q: "보험료가 사고 발생 시마다 인상되나요?",
    a: "비갱신형으로 가입 시 사고 발생 여부와 관계없이 보험료가 변동되지 않습니다. 사고 후에도 동일한 보험료를 유지하며 안정적인 보장을 받으실 수 있습니다."
  }
];

const DOCUMENTS = {
  corporate: [
    "사업자등록증 사본",
    "법인등기부등본 (3개월 내 발급)",
    "법인인감증명서 (3개월 내 발급)",
    "주주명부",
    "4대보험 가입자 명부",
    "법인계좌 사본"
  ],
  individual: [
    "사업자등록증 사본",
    "대표자 신분증 사본",
    "개인인감증명서 (3개월 내 발급)",
    "4대보험 가입자 명부",
    "대표자 개인계좌 사본"
  ]
};

// --- Sub-components ---

const CaseModal = ({ isOpen, onClose, caseData }: { isOpen: boolean, onClose: () => void, caseData: Case | null }) => {
  if (!isOpen || !caseData) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-samsung-dark/80 backdrop-blur-md"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 border border-premium"
        >
          <div className="p-8 md:p-12 overflow-y-auto max-h-[85vh]">
            <div className="flex justify-between items-start mb-8">
              <div className="p-4 bg-red-50 rounded-2xl text-warning-red shadow-inner">
                {caseData.icon}
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <Minus className="w-6 h-6 text-slate-400" />
              </button>
            </div>
            <div className="inline-flex px-3 py-1 rounded-full bg-samsung-blue text-white text-[10px] font-black tracking-widest uppercase mb-4">
              {caseData.tag}
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-2">{caseData.title}</h3>
            <p className="text-xl font-bold text-warning-red mb-10">{caseData.result}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 mb-1">유형</p>
                <p className="font-bold text-slate-700">{caseData.type}</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 mb-1">관련 업종</p>
                <p className="font-bold text-slate-700">{caseData.industry}</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-black text-samsung-blue uppercase mb-3 tracking-widest">상세 판결 내용</h4>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {caseData.detail}
                </p>
              </div>
              <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                <h4 className="text-sm font-black text-amber-700 uppercase mb-2 tracking-widest flex items-center gap-2">
                  <AlertCircle size={14} /> 중요한 인사이트
                </h4>
                <p className="text-sm text-amber-900 leading-relaxed font-semibold">
                  {caseData.implication}
                </p>
              </div>
            </div>
          </div>
          <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button onClick={onClose} className="px-8 py-3 bg-samsung-blue text-white rounded-xl font-bold hover:bg-samsung-dark transition-all">
              확인
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const SectionTitle = ({ subtitle, title, light = false }: { subtitle: string, title: string, light?: boolean }) => (
  <div className="mb-16">
    <p className={`text-sm font-black tracking-[0.2em] uppercase mb-4 ${light ? 'text-blue-300' : 'text-samsung-blue'}`}>
      {subtitle}
    </p>
    <h2 className={`text-3xl md:text-5xl font-black leading-[1.2] ${light ? 'text-white' : 'text-slate-900'}`}>
      {title}
    </h2>
    <div className={`h-1.5 w-20 mt-8 rounded-full ${light ? 'bg-blue-400/30' : 'bg-samsung-blue/20'}`} />
  </div>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState("defense");
  const [docType, setDocType] = useState<"corporate" | "individual">("corporate");
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<null | 'sending' | 'success' | 'error'>(null);

  const handleConsultationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    const formData = new FormData(e.currentTarget);
    const data = {
      companyName: formData.get('companyName'),
      CEO: formData.get('CEO'),
      employeeCount: formData.get('employeeCount'),
      contact: formData.get('contact'),
    };

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setFormStatus('success');
        setTimeout(() => setFormStatus(null), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };

  const handleProposalRequest = async (type: string) => {
    try {
      await fetch('/api/proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });
      alert('제안서 요청이 서버에 정상적으로 접수되었습니다.');
    } catch (error) {
      console.error('Error requesting proposal:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBFBFA]">
      
      {/* Header */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-premium py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-samsung-blue text-white flex items-center justify-center rounded-xl shadow-lg shadow-samsung-blue/30">
              <ShieldCheck size={24} />
            </div>
            <span className="font-black text-2xl tracking-tighter text-samsung-blue">
              SAMSUNG <span className="font-light">LIFE</span>
            </span>
          </div>
          <div className="hidden md:flex gap-10">
            {["위기 분석", "삼성의 제안", "구비 서류"].map((item) => (
              <button key={item} className="text-sm font-bold text-slate-500 hover:text-samsung-blue transition-colors">
                {item}
              </button>
            ))}
          </div>
          <button className="bg-samsung-blue text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-samsung-dark transition-all shadow-xl shadow-samsung-blue/20">
            상담 예약
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-32 md:pt-60 md:pb-60 overflow-hidden">
        <div className="absolute inset-0 bg-slate-100 mix-blend-multiply opacity-30 -z-10" />
        <div className="absolute top-0 right-0 w-[60%] h-full bg-samsung-blue/5 rounded-l-[200px] -z-20" />
        <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-warning-red text-[10px] font-black uppercase tracking-widest mb-8 border border-red-100">
              <AlertCircle size={12} /> Strategic Insight 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] mb-8">
              CEO의 안전이<br />
              <span className="text-samsung-blue">기업의 생존입니다.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl mb-12">
              중대재해처벌법 전면 확대. 이제 모든 5인 이상 사업장은 법적 리스크 앞에 서있습니다. 
              최대 <span className="text-slate-900 font-black">징역 15년</span>의 사법 리스크, 감당하실 준비가 되셨습니까?
            </p>
            <button className="group flex items-center gap-4 bg-samsung-blue text-white px-8 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-samsung-blue/40 hover:bg-samsung-dark hover:-translate-y-1 transition-all">
              기업 리스크 자가진단하기
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="flex-1 relative"
          >
            <div className="relative rounded-[60px] overflow-hidden shadow-2xl executive-editorial-shadow aspect-[4/5] max-w-md mx-auto">
              <img 
                src="https://picsum.photos/seed/executive-leadership/1000/1250" 
                alt="CEO Management Strategy" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-samsung-dark/60 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <div className="p-6 glass-blue rounded-3xl border border-white/20 backdrop-blur-md">
                  <p className="text-xs font-black text-blue-200 uppercase tracking-widest mb-2">Implication</p>
                  <p className="text-white text-lg font-bold leading-snug">"2026년 현재 안전지대는 더 이상 존재하지 않습니다."</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-24 bg-white border-y border-premium">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {STATISTICS.map((stat, idx) => (
              <div key={idx} className="text-center lg:text-left">
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.1em] mb-3">{stat.label}</p>
                <p className="text-3xl md:text-5xl font-black text-samsung-blue mb-2">{stat.value}</p>
                <p className="text-xs text-slate-500 font-semibold">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <SectionTitle 
            subtitle="Problem & Implication" 
            title="실제 사례로 보는 CEO의 위기" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {LEGAL_CASES.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-[40px] border border-premium executive-editorial-shadow flex flex-col h-full group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-red-50 group-hover:text-warning-red transition-all duration-500">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-black py-1 px-2 rounded bg-slate-900 text-white uppercase">{item.tag}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{item.title}</h3>
                <p className="text-warning-red font-bold text-sm mb-4">{item.result}</p>
                <p className="text-slate-500 text-sm leading-relaxed font-medium mb-8 flex-grow">
                  {item.detail}
                </p>
                <button 
                  onClick={() => { setSelectedCase(item) }}
                  className="w-full py-4 border border-premium rounded-2xl flex items-center justify-center gap-2 text-sm font-bold text-slate-700 hover:bg-samsung-blue hover:text-white hover:border-samsung-blue transition-all"
                >
                  판례 상세보기 <ArrowRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mitigation Factors Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <SectionTitle 
            subtitle="Sentencing Guidelines" 
            title="대법원 양형위원회가 제시하는\n처벌 경감의 핵심 요소" 
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="p-10 bg-slate-50 rounded-[40px] border border-premium">
              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="text-samsung-blue" /> 처벌 감경 요소
              </h3>
              <ul className="space-y-6">
                {[
                  "피해 보상을 위한 보험 가입 (가장 중요한 감경 사유)",
                  "피해자나 유족과의 진지한 합의 (처벌불원)",
                  "안전보건관리체계의 실질적 구축 및 이행 노력",
                  "사고 발생 경위에 참작할만한 사유가 있는 경우"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-samsung-blue mt-2 flex-shrink-0" />
                    <p className="text-slate-600 font-bold leading-tight">{item}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-10 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-sm font-bold text-samsung-blue leading-relaxed">
                  * 2026년 기준 대법원 판례에 따르면, "보험을 통한 상당한 보상 재원 마련"은 CEO의 형사 처벌 수위를 낮추는 결정적 증거로 인정됩니다.
                </p>
              </div>
            </div>
            <div className="p-10 bg-red-50 rounded-[40px] border border-red-100">
              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <AlertCircle className="text-warning-red" /> 가중 처벌 요소
              </h3>
              <ul className="space-y-6">
                {[
                  "안전보건 조치의무 위반 정도가 극히 중한 경우",
                  "단기간 내에 동일한 사고가 반복적으로 발생한 경우",
                  "다수의 피해자가 발생한 대형 사고 (아리셀 사례 등)",
                  "증거 인폐 또는 수사 비협조"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-warning-red mt-2 flex-shrink-0" />
                    <p className="text-slate-600 font-bold leading-tight">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gap Analysis Section */}
      <section className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-samsung-blue/10 blur-[150px] -z-10" />
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <SectionTitle 
            subtitle="Financial Gap" 
            title="산재보험만으로는 부족한\n3.3억 원의 부족 자금" 
            light 
          />
          <div className="bg-white/5 border border-white/10 rounded-[60px] p-8 md:p-16 backdrop-blur-sm relative">
            <div className="flex flex-col gap-10">
              <div className="flex justify-between items-center text-white">
                <span className="text-sm font-black uppercase tracking-widest opacity-50">Total Civil Liability</span>
                <span className="text-4xl font-black">4.7억원</span>
              </div>
              <div className="relative h-60 w-full flex items-end gap-1">
                <div className="flex-1 bg-blue-500/20 rounded-t-3xl flex flex-col items-center justify-center text-blue-300 font-black h-[30%]" title="Government Portion">
                  1.4억
                  <span className="text-[10px] opacity-60">산재보상</span>
                </div>
                <div className="flex-[2] bg-warning-red rounded-t-[40px] flex flex-col items-center justify-center text-white font-black h-[100%] shadow-2xl shadow-red-500/20" title="CEO Liability Gap">
                  3.3억
                  <span className="text-[10px] opacity-80 uppercase tracking-tighter">CEO 직접 부담 (GAP)</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm font-medium leading-relaxed italic text-center">
                * 2026년 기준 (남 30세, 월 300만원, 정년 60세, 본인과실 20% 가정 시)<br />
                정부 보상금을 제외한 <strong className="text-white font-bold">약 3억 3천만 원의 민사 배상금</strong>은 기업의 순수 현금으로 즉시 마련되어야 합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <SectionTitle 
            subtitle="Need-Payoff" 
            title="삼성생명이 제안하는\nCEO 통합 방어 전략" 
          />
          <div className="flex gap-4 mb-16 overflow-x-auto pb-4 scrollbar-hide">
            {SOLUTIONS.map((sol) => (
              <button
                key={sol.id}
                onClick={() => setActiveTab(sol.id)}
                className={`flex-none px-8 py-4 rounded-2xl font-black transition-all ${activeTab === sol.id ? 'bg-samsung-blue text-white shadow-xl shadow-samsung-blue/30 scale-105' : 'bg-white border border-premium text-slate-400 hover:border-samsung-blue hover:text-samsung-blue'}`}
              >
                {sol.title.split(' (')[0]}
              </button>
            ))}
          </div>
          
          <AnimatePresence mode="wait">
            {SOLUTIONS.filter(s => s.id === activeTab).map((sol) => (
              <motion.div 
                key={sol.id}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
              >
                <div>
                  <div className="w-20 h-20 bg-samsung-blue/10 rounded-[32px] flex items-center justify-center text-samsung-blue mb-10">
                    {sol.icon}
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-8">{sol.title}</h3>
                  <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12">
                    {sol.description}
                  </p>
                  <ul className="space-y-4">
                    {sol.benefits.map((b, i) => (
                      <li key={i} className="flex items-center gap-4 text-slate-900 font-bold">
                        <div className="w-6 h-6 bg-samsung-blue text-white rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 size={14} />
                        </div>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative rounded-[60px] overflow-hidden shadow-2xl aspect-video border border-premium transition-transform hover:scale-[1.02] duration-700">
                  <img src={
                    sol.id === "defense" ? "https://picsum.photos/seed/corporate-legal/800/450" :
                    sol.id === "efficiency" ? "https://picsum.photos/seed/financial-optimization/800/450" :
                    "https://picsum.photos/seed/management-office/800/450"
                  } alt="Strategic management solution" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-samsung-blue/20 mix-blend-overlay" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* FAQ & Prep Section */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <SectionTitle subtitle="FAQ" title="실무 담당자가\n자주 묻는 질문" />
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="bg-white border border-premium rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-8">
                    <p className="text-lg font-black text-slate-900 flex gap-4">
                      <span className="text-samsung-blue">Q.</span> {faq.q}
                    </p>
                    <p className="mt-4 text-slate-500 font-medium leading-relaxed italic border-l-2 border-slate-100 pl-6">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionTitle subtitle="On-boarding" title="가입 제안을 위한\n준비 서류 안내" />
            <div className="bg-samsung-blue rounded-[50px] p-10 md:p-16 text-white shadow-2xl shadow-samsung-blue/30 relative overflow-hidden group">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
              <div className="flex gap-4 mb-12 bg-white/10 p-2 rounded-2xl border border-white/10">
                <button 
                  onClick={() => setDocType("corporate")}
                  className={`flex-1 py-4 rounded-xl font-black text-sm transition-all ${docType === "corporate" ? 'bg-white text-samsung-blue' : 'text-white/60 hover:text-white'}`}
                >
                  법인사업자
                </button>
                <button 
                  onClick={() => setDocType("individual")}
                  className={`flex-1 py-4 rounded-xl font-black text-sm transition-all ${docType === "individual" ? 'bg-white text-samsung-blue' : 'text-white/60 hover:text-white'}`}
                >
                  개인사업자
                </button>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                {DOCUMENTS[docType].map((doc, idx) => (
                  <motion.li 
                    key={`${docType}-${idx}`}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 font-bold text-sm bg-white/5 p-4 rounded-2xl border border-white/10"
                  >
                    <FileText size={16} className="text-blue-300" />
                    {doc}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-12 p-6 bg-white/10 rounded-3xl border border-white/20">
                <p className="text-[11px] font-medium leading-relaxed opacity-80">
                  ※ 사업자등록증상 <strong>공동대표</strong>일 경우, 대표자 전원의 인감증명서가 필요합니다.<br />
                  ※ 업종 및 가입 조건에 따라 보장 한도 및 추가 서류가 상이할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto bg-white rounded-[80px] p-12 md:p-24 border border-premium flex flex-col lg:flex-row gap-20 items-center executive-editorial-shadow">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                30년 전문가의<br />
                <span className="text-samsung-blue">무료 리스크 진단</span>
              </h2>
              <div className="flex flex-col gap-6 mb-12">
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-samsung-blue">
                    <User size={32} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Senior Project Manager</p>
                    <p className="text-2xl font-black text-slate-900">윤동혁</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <a href="tel:01066297272" className="flex items-center justify-center lg:justify-start gap-3 text-xl font-black text-slate-900 hover:text-samsung-blue transition-colors">
                    <Phone size={20} className="text-samsung-blue" /> 010-6629-7272
                  </a>
                  <a href="mailto:Brandon.DH.Yoon@gmail.com" className="flex items-center justify-center lg:justify-start gap-3 text-lg font-bold text-slate-500">
                    <Mail size={20} className="text-samsung-blue" /> Brandon.DH.Yoon@gmail.com
                  </a>
                </div>
              </div>
              <p className="text-slate-400 font-medium leading-relaxed italic">
                당신의 기업을 위한 가장 안전한 마지노선을<br />
                삼성생명의 인사적 노하우로 설계해 드립니다.
              </p>
            </div>
            <div className="flex-1 w-full max-w-md">
              <form className="space-y-6" onSubmit={handleConsultationSubmit}>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Company Name</label>
                  <input name="companyName" required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-3xl px-8 py-5 text-sm font-bold focus:ring-4 focus:ring-samsung-blue/10 focus:border-samsung-blue outline-none transition-all" placeholder="회사업체명을 입력해주세요" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">CEO / Manager</label>
                    <input name="CEO" required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-3xl px-8 py-5 text-sm font-bold focus:ring-4 focus:ring-samsung-blue/10 focus:border-samsung-blue outline-none transition-all" placeholder="성함" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Employee Count</label>
                    <select name="employeeCount" className="w-full bg-slate-50 border border-slate-200 rounded-3xl px-8 py-5 text-sm font-bold focus:ring-4 focus:ring-samsung-blue/10 outline-none transition-all appearance-none">
                      <option>5인 미만</option>
                      <option>5인 ~ 50인</option>
                      <option>50인 이상</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Contact Info</label>
                  <input name="contact" required type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-3xl px-8 py-5 text-sm font-bold focus:ring-4 focus:ring-samsung-blue/10 focus:border-samsung-blue outline-none transition-all" placeholder="연락처 (예: 010-0000-0000)" />
                </div>
                <button type="submit" disabled={formStatus === 'sending'} className="w-full py-6 bg-samsung-blue text-white rounded-3xl font-black text-lg shadow-2xl shadow-samsung-blue/30 hover:bg-samsung-dark hover:-translate-y-1 transition-all disabled:opacity-50">
                  {formStatus === 'sending' ? '처리 중...' : formStatus === 'success' ? '제출 완료' : '컨설팅 신청 및 제안서 요청'}
                </button>
                {formStatus === 'error' && <p className="text-xs text-warning-red font-bold text-center mt-2">오류가 발생했습니다. 다시 시도해주세요.</p>}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-premium">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-8 grayscale opacity-50">
            <Building2 className="text-slate-900" />
            <span className="font-black text-xl tracking-tighter text-slate-900">
              SAMSUNG <span className="font-light">LIFE</span>
            </span>
          </div>
          <p className="text-center text-[11px] text-slate-400 font-bold leading-relaxed max-w-3xl">
            본 웹페이지의 내용은 '삼성 기업재해보장보험' 상품의 홍보 및 이해를 돕기 위해 제작된 보충 자료입니다.<br />
            실제 가입 및 보장 가능 여부는 업종의 위험 등급(1급~4급) 및 언더라이팅 심사 결과에 따라 달라지며, 삼성생명의 공식 약관을 우선으로 합니다.<br />
            &copy; 2026 SAMSUNG LIFE INSURANCE. HR/RISK MANAGEMENT PARTNER.
          </p>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-10 right-10 flex flex-col gap-4 z-[90]">
        <motion.a 
          whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}
          href="tel:01066297272"
          className="w-16 h-16 bg-white border border-premium text-samsung-blue rounded-[24px] flex items-center justify-center shadow-2xl"
        >
          <Phone size={24} />
        </motion.a>
        <motion.button 
          onClick={() => handleProposalRequest('floating')}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="h-16 px-8 bg-samsung-blue text-white rounded-[24px] font-black text-sm flex items-center gap-3 shadow-2xl shadow-samsung-blue/40"
        >
          <FileText size={20} />
          제안서 요청
        </motion.button>
      </div>

      <CaseModal 
        isOpen={selectedCase !== null}
        onClose={() => setSelectedCase(null)}
        caseData={selectedCase}
      />

    </div>
  );
}

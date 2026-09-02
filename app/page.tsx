"use client";

import { useMemo, useState } from 'react';
import {
  Activity,
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Gauge,
  HardHat,
  LineChart,
  Menu,
  RadioTower,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  Wallet,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const navItems = [
  ['Возможности', '#features'],
  ['Для кого', '#audiences'],
  ['Тарифы', '#pricing'],
  ['Как подключиться', '#start'],
  ['FAQ', '#faq'],
] as const;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-xs font-bold uppercase tracking-[.16em] text-[#0084DA]">{children}</p>;
}

function SectionHeading({ eyebrow, title, text, align = 'left' }: { eyebrow: string; title: string; text?: string; align?: 'left' | 'center' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-[760px] text-center' : 'max-w-[720px]'}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-[-.04em] text-[#111C2D]">{title}</h2>
      {text ? <p className="mt-5 text-base leading-7 text-[#707A82] sm:text-lg">{text}</p> : null}
    </div>
  );
}

function Logo() {
  return (
    <svg aria-label="K8X" className="h-[21px] w-[90px]" viewBox="0 0 90 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M48.8591 0C49.7616 0 50.5542.0696 51.2197.2244 51.8798.3779 52.4724.6285 52.9122 1.0309 53.7761 1.8097 54.0737 3.102 54.0737 4.604v1.7605c0 1.2568-.2927 2.3496-1.0023 3.1585-.1796.2054-.3827.3868-.6063.5452.3504.1949.6614.4266.9252.7011.781.8122 1.1047 1.9318 1.1047 3.2245v2.0354c0 1.6413-.3496 3.0271-1.3119 3.8626-.924.8132-2.4175 1.1086-4.2091 1.1086H36.8592c-1.7817 0-3.2672-.29-4.1897-1.0893-.9462-.837-1.287-2.2282-1.287-3.8761v-2.0354c0-1.2887.3152-2.4058 1.0793-3.2181.2639-.2744.5734-.5063.9216-.7016-.2219-.1584-.4239-.3393-.6031-.5442-.7001-.8006-.9825-1.8973-.9825-3.159V4.604c0-1.5023.2917-2.7945 1.1425-3.5731.4443-.4038 1.0413-.654 1.708-.8065C35.3162.0699 36.1098 0 37.0124 0h11.8467ZM37.5112 12.2889c-.7607 0-.9878.1428-1.0132.1668-.0462.0525-.1746.2981-.1746 1.0061v2.1092c0 .728.1266.9817.1641 1.0293.0624.0493.314.1617 1.0237.1617h10.8492c.711 0 .9597-.1134 1.0132-.1668.0471-.0608.1745-.3132.1745-1.0242v-2.1092c0-.711-.1274-.9561-.1745-1.0061-.0608-.0525-.315-.1668-1.0132-.1668H37.5112Zm.4023-8.0694c-.7369 0-.9818.1388-1.0264.1795-.0729.0715-.1803.3338-.1803 1.0301v1.5041c0 .7338.1245.9971.169 1.0707.0635.0472.317.157 1.0377.157h10.0445c.7299 0 .9845-.1184 1.0326-.1668.0609-.0718.1741-.3354.1741-1.0609V5.4291c0-.7242-.1156-.9826-.1633-1.0495-.0588-.0466-.3132-.1601-1.0434-.1601H37.9135Z" fill="#111C2D" />
      <path d="M0 0v21h5.1815V0H0Z" fill="#0084DA" />
      <path d="M83.0163 21H90L79.6806 11.9677l-3.5168 3.0625L83.0163 21Z" fill="#0084DA" />
      <path d="M90 0h-6.9837l-8.5243 7.4262L66.0075 0h-7.0964l12.0526 10.5L58.9111 21h6.9838L90 0Z" fill="#111C2D" />
      <path d="M19.3742 21h7.0964L16.1917 11.8635l-3.587 3.1756L19.3742 21Z" fill="#111C2D" />
      <path d="M14.5307 10.3871 26.4706 0h-7.0964L7.3217 10.3871l3.6045 3.1739 3.6045-3.1739Z" fill="#111C2D" />
    </svg>
  );
}

function AudienceContent({ icon: Icon, title, items }: { icon: React.ElementType; title: string; items: string[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-[.85fr_1.15fr] md:items-center">
      <div><span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#EAF6FD] text-[#0084DA]"><Icon className="size-6" /></span><h3 className="mt-6 text-2xl font-bold leading-snug tracking-[-.035em] text-[#111C2D] sm:text-3xl">{title}</h3></div>
      <ul className="grid gap-3 sm:grid-cols-2">{items.map(item => <li key={item} className="flex items-start gap-3 rounded-xl bg-[#F7FAFC] p-4 leading-6 text-[#535D6C]"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#32B77A]" />{item}</li>)}</ul>
    </div>
  );
}

export default function Home() {
  const [hashrate, setHashrate] = useState(200);
  const [uptime, setUptime] = useState(98.5);
  const calculator = useMemo(() => {
    const dailyRate = 0.000000504;
    const full = Math.max(0, hashrate) * dailyRate;
    const actual = full * (uptime / 100);
    return { full, actual, loss: full - actual };
  }, [hashrate, uptime]);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#E5EAEF]/90 bg-white/90 backdrop-blur-xl">
        <div className="site-container flex h-[72px] items-center justify-between gap-8">
          <a href="#top" aria-label="K8X — на главную" className="shrink-0"><Logo /></a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Основная навигация">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} className="text-sm font-medium text-[#535D6C] transition-colors hover:text-[#0084DA]">{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2.5">
            <Button nativeButton={false} render={<a href="https://client.k8x.io/" />} variant="ghost" className="hidden h-10 px-4 text-[#0084DA] md:inline-flex">Войти</Button>
            <Button nativeButton={false} render={<a href="https://client.k8x.io/" />} className="hidden h-10 bg-[#0084DA] px-5 text-white shadow-[0_8px_22px_rgba(0,132,218,.2)] hover:bg-[#0076C4] sm:inline-flex">Зарегистрироваться</Button>
            <Sheet>
              <SheetTrigger className="inline-flex size-10 items-center justify-center rounded-lg border border-[#D8E1E8] text-[#111C2D] lg:hidden" aria-label="Открыть меню"><Menu className="size-5" /></SheetTrigger>
              <SheetContent className="bg-white">
                <SheetHeader className="border-b border-[#E5EAEF] p-6">
                  <SheetTitle><Logo /></SheetTitle>
                  <SheetDescription>Стабильный майнинг и прозрачный учёт хешрейта.</SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col px-4 py-3" aria-label="Мобильная навигация">
                  {navItems.map(([label, href]) => <a key={label} href={href} className="rounded-xl px-3 py-3.5 text-base font-semibold text-[#111C2D] hover:bg-[#F2F9FD]">{label}</a>)}
                </nav>
                <SheetFooter className="border-t border-[#E5EAEF] p-6">
                  <Button nativeButton={false} render={<a href="https://client.k8x.io/" />} variant="outline" className="h-11">Войти</Button>
                  <Button nativeButton={false} render={<a href="https://client.k8x.io/" />} className="h-11 bg-[#0084DA] text-white hover:bg-[#0076C4]">Зарегистрироваться</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section id="top" className="hero-grid relative pb-20 pt-[144px] sm:pb-28 sm:pt-[164px]">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="site-container relative z-10 grid items-center gap-14 lg:grid-cols-[1.04fr_.96fr] lg:gap-10">
          <div className="max-w-[680px]">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#DDE9F1] bg-white/75 px-3.5 py-2 text-sm font-medium text-[#3F4855] shadow-[0_8px_28px_rgba(17,28,45,.05)] backdrop-blur">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#67CF9D] opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#32B77A]" /></span>
              Инфраструктура пула работает стабильно
            </div>
            <h1 className="max-w-[760px] text-[clamp(2.65rem,5.2vw,4.75rem)] font-bold leading-[1.03] tracking-[-0.045em] text-[#111C2D]">K8X — пул для стабильного и выгодного майнинга</h1>
            <p className="mt-7 max-w-[650px] text-lg leading-8 text-[#535D6C] sm:text-xl">Больше принятого хешрейта — больше учтённого дохода. Без обрывов соединения и скрытых потерь.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button nativeButton={false} render={<a href="https://client.k8x.io/" />} className="h-13 bg-[#0084DA] px-7 text-base text-white shadow-[0_12px_30px_rgba(0,132,218,.24)] hover:bg-[#0076C4]">Зарегистрироваться<ArrowRight className="ml-1 size-4" /></Button>
              <Button nativeButton={false} render={<a href="#features" />} variant="outline" className="h-13 border-[#D8E1E8] bg-white px-7 text-base text-[#111C2D] hover:bg-[#F2F9FD]">Посмотреть возможности</Button>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#535D6C]">
              {['FPPS', 'Выплаты от 0,0002 BTC', 'Комиссия 1,5%'].map((item) => <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-[#32B77A]" />{item}</span>)}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[590px]">
            <div className="dashboard-shell relative rounded-[28px] border border-white/80 bg-white/80 p-3 shadow-[0_34px_100px_rgba(17,28,45,.14)] backdrop-blur-xl">
              <div className="overflow-hidden rounded-[20px] border border-[#E5EAEF] bg-white">
                <div className="flex items-center justify-between border-b border-[#E5EAEF] px-5 py-4">
                  <div><p className="text-xs font-semibold uppercase tracking-[.12em] text-[#87929C]">Обзор пула</p><p className="mt-1 text-sm font-semibold text-[#111C2D]">Все устройства</p></div>
                  <span className="rounded-full bg-[#DDF9EB] px-3 py-1.5 text-xs font-semibold text-[#24855D]">Онлайн</span>
                </div>
                <div className="grid gap-px bg-[#E5EAEF] sm:grid-cols-3">
                  {[['13.45 EH/s', 'Хешрейт пула'], ['87 926', 'Устройств'], ['99.98%', 'Стабильность']].map(([value, label]) => <div key={label} className="bg-white px-5 py-5"><p className="text-xl font-bold tracking-[-.03em] text-[#111C2D]">{value}</p><p className="mt-1 text-xs text-[#707A82]">{label}</p></div>)}
                </div>
                <div className="p-5">
                  <div className="mb-5 flex items-center justify-between"><div><p className="text-sm font-semibold text-[#111C2D]">Принятый хешрейт</p><p className="mt-1 text-xs text-[#87929C]">Последние 24 часа</p></div><div className="flex items-center gap-2 text-sm font-semibold text-[#111C2D]"><Server className="size-4 text-[#0084DA]" />7,42 PH/s</div></div>
                  <div className="flex h-36 items-end gap-1.5">
                    {[38,46,43,58,52,64,61,73,68,79,76,84,80,87,83,91,88,94,90,96,93,98,95,100].map((height, index) => <span key={index} className="flex-1 rounded-t-sm bg-gradient-to-t from-[#0084DA] to-[#69B7E9]" style={{ height: `${height}%`, opacity: 0.52 + index / 52 }} />)}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[11px] text-[#9AA4AD]"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Показатели пула" className="relative z-20 -mt-2 border-y border-[#E5EAEF] bg-white">
        <div className="site-container grid divide-y divide-[#E5EAEF] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {[
            ['13.45 EH/s', 'текущий хешрейт пула'],
            ['87 926', 'подключённых устройств'],
            ['0,0002 BTC', 'минимальная выплата'],
            ['FPPS', 'прозрачная модель начислений'],
          ].map(([value, label]) => (
            <div key={label} className="px-6 py-7 sm:px-8">
              <p className="text-2xl font-bold tracking-[-.04em] text-[#111C2D]">{value}</p>
              <p className="mt-1 text-sm text-[#707A82]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="site-container grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <SectionHeading eyebrow="Проблема" title="Оборудование работает. Но весь ли хешрейт доходит до пула?" text="Короткие разрывы соединения, нестабильный канал и незаметные простои уменьшают принятый хешрейт. В итоге оборудование включено, а часть потенциального дохода не учитывается." />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [RadioTower, 'Обрывы соединения', 'Нестабильная сеть приводит к переподключениям и потерянным шарам.'],
              [Activity, 'Снижение хешрейта', 'Фактическая эффективность может отличаться от показателей самого ASIC.'],
              [Clock3, 'Непрозрачный аптайм', 'Без независимого расчёта сложно проверить реальное время работы.'],
              [BarChart3, 'Разрозненные отчёты', 'Данные пула, хостинга и оборудования приходится сопоставлять вручную.'],
            ].map(([Icon, title, text]) => (
              <article key={String(title)} className="rounded-2xl border border-[#E5EAEF] bg-white p-6 shadow-[0_16px_45px_rgba(17,28,45,.05)]">
                <span className="mb-5 inline-flex size-11 items-center justify-center rounded-xl bg-[#F2F9FD] text-[#0084DA]"><Icon className="size-5" /></span>
                <h3 className="text-lg font-bold tracking-[-.02em] text-[#111C2D]">{String(title)}</h3>
                <p className="mt-2 text-sm leading-6 text-[#707A82]">{String(text)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="bg-[#F5F9FC] py-24 sm:py-32">
        <div className="site-container">
          <SectionHeading align="center" eyebrow="Решение K8X" title="Пул, мониторинг и прозрачный учёт в одном кабинете" text="K8X помогает не только получать выплаты, но и понимать, насколько стабильно и эффективно работает каждое устройство." />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              [Zap, 'Стабильное соединение', 'Инфраструктура адаптирована к сложным сетевым условиям и поддерживает устойчивое подключение ASIC.'],
              [Gauge, 'Контроль устройств', 'Хешрейт, статус и отклонения видны по каждому воркеру без ручной сверки.'],
              [Clock3, 'Фактический аптайм', 'Расчёт за выбранный период помогает контролировать SLA, биллинг и простои.'],
              [LineChart, 'Понятная отчётность', 'Начисления и технические показатели собраны в едином интерфейсе.'],
            ].map(([Icon, title, text], index) => (
              <article key={String(title)} className="group rounded-[22px] border border-[#E5EAEF] bg-white p-7 transition-transform duration-300 hover:-translate-y-1">
                <div className="mb-8 flex items-center justify-between"><span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#EAF6FD] text-[#0084DA]"><Icon className="size-6" /></span><span className="text-xs font-bold text-[#B5BEC6]">0{index + 1}</span></div>
                <h3 className="text-xl font-bold tracking-[-.03em] text-[#111C2D]">{String(title)}</h3>
                <p className="mt-3 text-sm leading-6 text-[#707A82]">{String(text)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111C2D] py-24 text-white sm:py-32">
        <div className="site-container grid items-center gap-16 lg:grid-cols-[.82fr_1.18fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[.16em] text-[#69B7E9]">Личный кабинет</p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-[-.04em]">Видно не только начисление, но и причину результата</h2>
            <p className="mt-6 max-w-[560px] text-base leading-7 text-[#B7C2CC] sm:text-lg">Сравнивайте ожидаемую и фактическую эффективность, находите устройства с отклонениями и проверяйте историю работы за любой период.</p>
            <ul className="mt-9 space-y-4">
              {['Хешрейт и статус каждого устройства', 'Аптайм за выбранные даты', 'История начислений и выплат', 'Данные для отчётов хостинга и инвесторов'].map(item => <li key={item} className="flex items-start gap-3 text-sm text-[#E5EDF3]"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#67CF9D]" />{item}</li>)}
            </ul>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-[#162439] p-3 shadow-[0_32px_90px_rgba(0,0,0,.28)]">
            <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#F9FBFD] text-[#111C2D]">
              <div className="flex items-center justify-between border-b border-[#E5EAEF] bg-white px-5 py-4">
                <div><p className="text-sm font-bold">Устройства</p><p className="mt-1 text-xs text-[#87929C]">Площадка №1 · 128 ASIC</p></div>
                <span className="rounded-lg bg-[#DDF9EB] px-3 py-1.5 text-xs font-bold text-[#24855D]">124 онлайн</span>
              </div>
              <div className="overflow-x-auto">
                <div className="min-w-[620px] p-4">
                  <div className="grid grid-cols-[1.4fr_.8fr_.8fr_.7fr] gap-4 border-b border-[#E5EAEF] px-3 pb-3 text-[11px] font-bold uppercase tracking-[.08em] text-[#9AA4AD]"><span>Воркер</span><span>Хешрейт</span><span>Аптайм</span><span>Статус</span></div>
                  {[
                    ['k8x-farm-034', '198,7 TH/s', '99,98%', 'Стабильно'],
                    ['k8x-farm-035', '194,2 TH/s', '99,91%', 'Стабильно'],
                    ['k8x-farm-036', '176,4 TH/s', '97,42%', 'Проверить'],
                    ['k8x-farm-037', '201,1 TH/s', '99,99%', 'Стабильно'],
                  ].map(([name, rate, up, status]) => <div key={name} className="grid grid-cols-[1.4fr_.8fr_.8fr_.7fr] items-center gap-4 border-b border-[#E5EAEF] px-3 py-4 text-xs last:border-0"><span className="font-semibold">{name}</span><span>{rate}</span><span>{up}</span><span className={status === 'Стабильно' ? 'font-semibold text-[#24855D]' : 'font-semibold text-[#D58A21]'}>{status}</span></div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="site-container">
          <SectionHeading align="center" eyebrow="Практическая польза" title="Меньше скрытых потерь. Больше данных для решений." text="K8X переводит технические показатели в понятную картину работы и доходности." />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              [CircleDollarSign, 'Учитывать больше результата', 'Стабильное соединение помогает передавать на пул больше фактически выполненной работы.'],
              [SlidersHorizontal, 'Быстрее находить отклонения', 'Снижение хешрейта и простои заметны до того, как они накопятся в итоговом отчёте.'],
              [ShieldCheck, 'Опирайтесь на данные', 'Фактические показатели упрощают контроль хостинга, SLA и расчёты с клиентами.'],
            ].map(([Icon, title, text]) => <article key={String(title)} className="rounded-[24px] border border-[#E5EAEF] p-8"><Icon className="size-7 text-[#0084DA]" /><h3 className="mt-7 text-2xl font-bold tracking-[-.035em] text-[#111C2D]">{String(title)}</h3><p className="mt-3 leading-7 text-[#707A82]">{String(text)}</p></article>)}
          </div>
        </div>
      </section>

      <section id="audiences" className="border-y border-[#E5EAEF] bg-[#FBFDFF] py-24 sm:py-32">
        <div className="site-container">
          <SectionHeading eyebrow="Для кого" title="Один пул — разные сценарии контроля" text="Выберите свой сценарий, чтобы увидеть, какие задачи K8X помогает решать в ежедневной работе." />
          <Tabs defaultValue="owner" className="mt-12">
            <TabsList className="h-auto w-full justify-start overflow-x-auto rounded-xl bg-[#EAF2F7] p-1.5 md:w-fit">
              <TabsTrigger value="owner" className="min-h-10 min-w-max px-4">Владелец ASIC</TabsTrigger>
              <TabsTrigger value="hosting" className="min-h-10 min-w-max px-4">Хостинг</TabsTrigger>
              <TabsTrigger value="investor" className="min-h-10 min-w-max px-4">Инвестор</TabsTrigger>
            </TabsList>
            <TabsContent value="owner" className="mt-6 rounded-[24px] border border-[#E5EAEF] bg-white p-7 sm:p-10"><AudienceContent icon={HardHat} title="Контроль каждого устройства без постоянного доступа к площадке" items={['Фактический хешрейт каждого ASIC', 'История простоев и отклонений', 'Начисления и выплаты в одном месте', 'Проверка работы оборудования на хостинге']} /></TabsContent>
            <TabsContent value="hosting" className="mt-6 rounded-[24px] border border-[#E5EAEF] bg-white p-7 sm:p-10"><AudienceContent icon={Building2} title="Прозрачная услуга для клиентов хостинга" items={['Расчёт аптайма за выбранный период', 'Отчётность по каждому клиенту и устройству', 'Данные для контроля SLA и биллинга', 'Меньше ручных запросов к технической команде']} /></TabsContent>
            <TabsContent value="investor" className="mt-6 rounded-[24px] border border-[#E5EAEF] bg-white p-7 sm:p-10"><AudienceContent icon={Users} title="Понятная картина эффективности майнинговых активов" items={['Сравнение плановых и фактических показателей', 'Контроль работы оборудования удалённо', 'Прозрачные данные для управленческих решений', 'Единый отчёт по площадкам и периодам']} /></TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="pricing" className="py-24 sm:py-32">
        <div className="site-container">
          <SectionHeading align="center" eyebrow="Тарифы" title="Прозрачные условия без скрытых платежей" text="Базовые условия открыты. Для крупных площадок и хостингов доступна индивидуальная модель." />
          <div className="mx-auto mt-14 grid max-w-[980px] gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <article className="relative overflow-hidden rounded-[28px] bg-[#111C2D] p-8 text-white sm:p-10">
              <div className="absolute -right-16 -top-20 size-64 rounded-full bg-[#0084DA]/25 blur-3xl" />
              <div className="relative"><p className="text-sm font-semibold text-[#69B7E9]">Базовый тариф</p><div className="mt-6 flex items-end gap-2"><span className="text-6xl font-bold tracking-[-.06em]">1,5%</span><span className="pb-2 text-sm text-[#B7C2CC]">комиссия пула</span></div><p className="mt-5 max-w-md leading-7 text-[#C5D0D9]">FPPS-начисления, мониторинг устройств и прозрачная статистика доступны в одном аккаунте.</p><ul className="mt-8 grid gap-3 sm:grid-cols-2">{['BTC', 'Выплаты от 0,0002 BTC', 'Онлайн-статистика', 'Контроль каждого воркера'].map(item => <li key={item} className="flex items-center gap-2 text-sm"><Check className="size-4 text-[#67CF9D]" />{item}</li>)}</ul><Button nativeButton={false} render={<a href="https://client.k8x.io/" />} className="mt-9 h-12 bg-[#0084DA] px-6 text-white hover:bg-[#1298EE]">Зарегистрироваться<ArrowRight className="size-4" /></Button></div>
            </article>
            <article className="rounded-[28px] border border-[#E5EAEF] bg-[#F7FAFC] p-8 sm:p-10"><p className="text-sm font-semibold text-[#0084DA]">Для бизнеса</p><h3 className="mt-5 text-3xl font-bold tracking-[-.04em] text-[#111C2D]">Индивидуальные условия</h3><p className="mt-4 leading-7 text-[#707A82]">Для хостингов, крупных ферм и инфраструктурных площадок.</p><ul className="mt-8 space-y-3">{['Индивидуальная комиссия', 'Подключение больших объёмов', 'Отчётность и API', 'Приоритетная поддержка'].map(item => <li key={item} className="flex items-center gap-3 text-sm text-[#3F4855]"><CheckCircle2 className="size-4 text-[#0084DA]" />{item}</li>)}</ul><Button nativeButton={false} render={<a href="mailto:support@k8x.io" />} variant="outline" className="mt-9 h-12 border-[#C9D5DD] bg-white px-6">Обсудить подключение</Button></article>
          </div>
        </div>
      </section>

      <section className="bg-[#F2F9FD] py-24 sm:py-32">
        <div className="site-container grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
          <SectionHeading eyebrow="Калькулятор" title="Посчитайте, как аптайм влияет на результат" text="Укажите суммарный хешрейт и фактический аптайм. Расчёт покажет ориентировочный результат и объём, который теряется во время простоев." />
          <div className="rounded-[28px] border border-[#D9E6EE] bg-white p-6 shadow-[0_24px_70px_rgba(17,28,45,.08)] sm:p-9">
            <div className="grid gap-7 sm:grid-cols-2">
              <label className="block"><span className="mb-2 block text-sm font-semibold text-[#111C2D]">Суммарный хешрейт</span><div className="relative"><Input type="number" min="0" value={hashrate} onChange={event => setHashrate(Number(event.target.value))} className="h-12 border-[#D9E2E9] pr-16 text-base" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#87929C]">TH/s</span></div></label>
              <div><div className="mb-4 flex items-center justify-between"><span className="text-sm font-semibold text-[#111C2D]">Фактический аптайм</span><span className="text-sm font-bold text-[#0084DA]">{uptime.toFixed(1).replace('.', ',')}%</span></div><Slider min={90} max={100} step={0.1} value={[uptime]} onValueChange={value => setUptime(Array.isArray(value) ? value[0] : value)} className="py-3" /><div className="mt-2 flex justify-between text-xs text-[#9AA4AD]"><span>90%</span><span>100%</span></div></div>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-[#F5F8FA] p-5"><p className="text-xs text-[#87929C]">При 100% аптайме</p><p className="mt-2 text-lg font-bold text-[#111C2D]">{calculator.full.toFixed(8).replace('.', ',')} BTC</p><p className="mt-1 text-xs text-[#9AA4AD]">за 1 день</p></div>
              <div className="rounded-2xl bg-[#EAF6FD] p-5"><p className="text-xs text-[#5383A2]">С учётом аптайма</p><p className="mt-2 text-lg font-bold text-[#0084DA]">{calculator.actual.toFixed(8).replace('.', ',')} BTC</p><p className="mt-1 text-xs text-[#6F9AB6]">за 1 день</p></div>
              <div className="rounded-2xl bg-[#FFF7E8] p-5"><p className="text-xs text-[#A0742D]">Потери от простоя</p><p className="mt-2 text-lg font-bold text-[#C47B17]">{calculator.loss.toFixed(8).replace('.', ',')} BTC</p><p className="mt-1 text-xs text-[#B18A50]">за 1 день</p></div>
            </div>
            <p className="mt-5 text-xs leading-5 text-[#9AA4AD]">Расчёт ориентировочный и не является гарантией доходности. Использована текущая расчётная ставка 1 TH/s = 0,0000005040 BTC в день.</p>
          </div>
        </div>
      </section>

      <section id="start" className="py-24 sm:py-32">
        <div className="site-container">
          <SectionHeading align="center" eyebrow="Как подключиться" title="Начните майнить через K8X в три шага" text="Не нужно устанавливать дополнительное программное обеспечение или менять прошивку оборудования." />
          <div className="relative mt-14 grid gap-5 md:grid-cols-3">
            {[
              ['01', 'Создайте аккаунт', 'Зарегистрируйтесь в K8X и добавьте воркера или площадку.'],
              ['02', 'Укажите Stratum K8X', 'Добавьте адрес сервера пула в настройки вашего ASIC.'],
              ['03', 'Контролируйте результат', 'Следите за хешрейтом, аптаймом, начислениями и выплатами.'],
            ].map(([number, title, text]) => <article key={number} className="rounded-[24px] border border-[#E5EAEF] bg-white p-8"><span className="text-5xl font-bold tracking-[-.06em] text-[#D9EFFB]">{number}</span><h3 className="mt-7 text-xl font-bold text-[#111C2D]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#707A82]">{text}</p></article>)}
          </div>
          <div className="mt-8 text-center"><Button nativeButton={false} render={<a href="https://client.k8x.io/" />} className="h-12 bg-[#0084DA] px-7 text-white hover:bg-[#0076C4]">Создать аккаунт<ArrowRight className="size-4" /></Button></div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#111C2D] py-24 text-white sm:py-32">
        <div className="site-container relative">
          <div className="absolute -right-40 -top-40 size-[500px] rounded-full bg-[#0084DA]/20 blur-[100px]" />
          <div className="relative grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div><p className="mb-4 text-xs font-bold uppercase tracking-[.16em] text-[#69B7E9]">Доказательства надёжности</p><h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-[-.04em]">Прозрачность начинается с проверяемых данных</h2><p className="mt-6 text-lg leading-8 text-[#B7C2CC]">В K8X открыты условия начислений, показатели пула и статус оборудования. Вы видите не обещание, а фактическую работу системы.</p></div>
            <div className="grid gap-4 sm:grid-cols-2">{[
              [Server, '13.45 EH/s', 'текущий хешрейт пула'],
              [Gauge, '87 926', 'подключённых устройств'],
              [Wallet, 'FPPS', 'модель начислений'],
              [ShieldCheck, '24/7', 'мониторинг инфраструктуры'],
            ].map(([Icon, value, label]) => <div key={String(label)} className="rounded-2xl border border-white/10 bg-white/[.045] p-6"><Icon className="size-5 text-[#69B7E9]" /><p className="mt-6 text-3xl font-bold tracking-[-.04em]">{String(value)}</p><p className="mt-1 text-sm text-[#9FADB9]">{String(label)}</p></div>)}</div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="site-container">
          <SectionHeading eyebrow="Почему K8X" title="Больше контроля, чем у обычного пула" text="K8X объединяет данные о начислениях и фактической работе оборудования, чтобы не собирать общую картину вручную." />
          <div className="mt-12 overflow-x-auto rounded-[22px] border border-[#E5EAEF]">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="bg-[#F5F8FA] text-[#535D6C]"><tr><th className="p-5 font-semibold">Возможность</th><th className="p-5 font-semibold">Обычный пул</th><th className="p-5 font-semibold">Кабинет хостинга</th><th className="bg-[#EAF6FD] p-5 font-bold text-[#0084DA]">K8X</th></tr></thead>
              <tbody>{[
                ['Начисления и выплаты', true, false, true],
                ['Контроль каждого устройства', false, true, true],
                ['Фактический аптайм', false, 'частично', true],
                ['План-факт эффективности', false, 'частично', true],
                ['Единая картина работы и дохода', false, false, true],
              ].map(([label, pool, hosting, k8x]) => <tr key={String(label)} className="border-t border-[#E5EAEF]"><td className="p-5 font-semibold text-[#111C2D]">{String(label)}</td>{[pool, hosting, k8x].map((value, index) => <td key={index} className={index === 2 ? 'bg-[#F7FCFF] p-5' : 'p-5'}>{value === true ? <CheckCircle2 className="size-5 text-[#32B77A]" /> : value === false ? <span className="text-[#B3BDC5]">—</span> : <span className="text-[#707A82]">{String(value)}</span>}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-[#E5EAEF] bg-[#FBFDFF] py-24 sm:py-32">
        <div className="site-container grid gap-14 lg:grid-cols-[.72fr_1.28fr]">
          <SectionHeading eyebrow="FAQ" title="Ответы перед подключением" text="Собрали основные вопросы о переходе на K8X, начислениях и мониторинге оборудования." />
          <Accordion multiple className="rounded-[22px] border border-[#E5EAEF] bg-white px-6 sm:px-8">
            {[
              ['Нужно ли устанавливать программу на ASIC?', 'Нет. Для подключения достаточно указать Stratum-адрес K8X и данные воркера в стандартных настройках оборудования.'],
              ['Как рассчитывается вознаграждение?', 'K8X использует модель FPPS. Начисления рассчитываются по принятому хешрейту с учётом условий выбранного тарифа.'],
              ['Какой минимальный порог выплаты?', 'Минимальная выплата для BTC составляет 0,0002 BTC.'],
              ['Как рассчитывается аптайм?', 'K8X анализирует фактическое присутствие и работу устройства на пуле за выбранный период, что позволяет видеть реальные простои.'],
              ['Можно ли подключить целую площадку?', 'Да. Для крупных ферм, хостингов и инвестиционных площадок предусмотрены индивидуальные условия и помощь с подключением.'],
              ['Куда обратиться за помощью?', 'Поддержка доступна по email support@k8x.io и в Telegram @k8xpool.'],
            ].map(([question, answer], index) => <AccordionItem key={question} value={`faq-${index}`}><AccordionTrigger className="py-5 text-base font-semibold text-[#111C2D] hover:no-underline">{question}</AccordionTrigger><AccordionContent className="max-w-[760px] pb-5 leading-6 text-[#707A82]">{answer}</AccordionContent></AccordionItem>)}
          </Accordion>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 sm:py-24">
        <div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[32px] bg-[#0084DA] px-6 py-16 text-center text-white sm:px-12 sm:py-20">
          <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_34%),radial-gradient(circle_at_85%_80%,#69B7E9_0,transparent_38%)]" />
          <div className="relative mx-auto max-w-[760px]"><p className="text-sm font-semibold text-white/75">Начните с одного устройства или подключите всю площадку</p><h2 className="mt-5 text-[clamp(2.1rem,5vw,4rem)] font-bold leading-[1.08] tracking-[-.045em]">Стабильный майнинг начинается с K8X</h2><p className="mx-auto mt-5 max-w-[600px] leading-7 text-white/80">Получайте больше принятого хешрейта и контролируйте фактическую работу оборудования в одном кабинете.</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Button nativeButton={false} render={<a href="https://client.k8x.io/" />} className="h-12 bg-white px-7 text-[#0084DA] hover:bg-[#F1F8FC]">Зарегистрироваться<ArrowRight className="size-4" /></Button><Button nativeButton={false} render={<a href="mailto:support@k8x.io" />} variant="outline" className="h-12 border-white/40 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white">Обсудить B2B-подключение</Button></div></div>
        </div>
      </section>

      <footer className="bg-[#111C2D] py-14 text-white">
        <div className="site-container grid gap-10 md:grid-cols-[1fr_auto_auto] md:gap-16">
          <div><div className="inline-flex rounded-lg bg-white p-3"><Logo /></div><p className="mt-5 max-w-[360px] text-sm leading-6 text-[#9FADB9]">Инфраструктура для стабильной работы оборудования и прозрачного учёта хешрейта.</p></div>
          <div><p className="text-sm font-bold">Продукт</p><div className="mt-4 flex flex-col gap-3 text-sm text-[#9FADB9]"><a href="#features" className="hover:text-white">Возможности</a><a href="#pricing" className="hover:text-white">Тарифы</a><a href="#start" className="hover:text-white">Подключение</a><a href="#faq" className="hover:text-white">FAQ</a></div></div>
          <div><p className="text-sm font-bold">Поддержка</p><div className="mt-4 flex flex-col gap-3 text-sm text-[#9FADB9]"><a href="https://t.me/k8xpool" className="hover:text-white">Telegram: @k8xpool</a><a href="mailto:support@k8x.io" className="hover:text-white">support@k8x.io</a><a href="#" className="hover:text-white">Условия использования</a><a href="#" className="hover:text-white">API-документация</a></div></div>
        </div>
        <div className="site-container mt-12 border-t border-white/10 pt-6 text-xs text-[#7F8D9A]">Copyright © 2026 K8X</div>
      </footer>
    </main>
  );
}

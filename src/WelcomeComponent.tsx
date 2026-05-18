import { useEffect, useState } from 'react';

// تعريف بنية بيانات المستخدم القادمة من تيليجرام لضمان توافق TypeScript
interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export function WelcomeComponent() {
  const [studentName, setStudentName] = useState<string>('الطالب');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // جلب بيانات الطالب التي حفظناها من مكتبة التيليجرام في الـ index.html
    const savedUser = sessionStorage.getItem('tg_user');
    
    if (savedUser) {
      try {
        const user: TelegramUser = JSON.parse(savedUser);
        // استخدام الاسم الأول للطالب المتصل
        if (user && user.first_name) {
          setStudentName(user.first_name);
        }
      } catch (error) {
        console.error("خطأ في قراءة بيانات تيليجرام:", error);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null; // إخفاء المكون مؤقتاً أثناء تحميل البيانات
  }

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      backgroundColor: '#1b1613', // لون الخلفية الداكن المطابق لتصميمك
      border: '1px solid #2b221d', // إطار خفيف متناسق
      padding: '16px', 
      borderRadius: '16px',
      direction: 'rtl',
      fontFamily: "'Cairo', 'Tajawal', sans-serif",
      width: '100%',
      boxSizing: 'border-box',
      margin: '12px 0'
    }}>
      {/* القسم الأيمن: النصوص والمعلومات */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'right' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* نقطة الاتصال الخضراء الخفاقة */}
          <span style={{
            width: '8px',
            height: '8px',
            backgroundColor: '#2ecc71',
            borderRadius: '50%',
            display: 'inline-block',
            boxShadow: '0 0 8px #2ecc71'
          }}></span>
          <span style={{ color: '#2980b9', fontSize: '14px', fontWeight: 'bold' }}>
            متصل عبر تليجرام (Telegram WebApp)
          </span>
        </div>
        
        <h3 style={{ color: '#e67e22', margin: '4px 0', fontSize: '18px', fontWeight: '700' }}>
          أهلاً بك يا {studentName} 👋
        </h3>
        
        <p style={{ color: '#95a5a6', margin: 0, fontSize: '12px', lineHeight: '1.4' }}>
          تم التحقق من بيئة تطبيق تليجرام المصغر بنجاح. سيتم ربط النتيجة بحسابك تلقائياً بعد الفراغ من الإجابة.
        </p>
      </div>
      
      {/* القسم الأيسر: الدائرة الزرقاء مع السهم (شعار تيليجرام) */}
      <div style={{
        backgroundColor: '#2481cc',
        borderRadius: '50%',
        minWidth: '42px',
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        boxShadow: '0 4px 10px rgba(36, 129, 204, 0.2)',
        marginRight: '12px'
      }}>
        {/* أيقونة الطائرة الورقية مبنية بالـ SVG لضمان الجودة والدقة وبدون مكاتب خارجية */}
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ transform: 'rotate(-45deg) translate(2px, -1px)' }}
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </div>
    </div>
  );
}

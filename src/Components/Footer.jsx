import React from "react";
import { useLanguage } from "../language/LanguageContext";

function Footer() {
   const { language, setLanguage } = useLanguage();

   const toggleLanguage = () => {
      setLanguage(prev => (prev === "RU" ? "UZ" : "RU"));
      setShowAlt(false);
   };

   const footerFirst = 'Oson Apteka '

   return (
      <footer className="">
         <div className="first_footer">
            <h1 className="first_footer-about">
               {language === "RU" ? "Справочник аптек — универсальный помощник для бизнеса и потребителя" : "Dori izlash tizimi va dorixonalar ma’lumotnomasi – biznes va iste’molchilar uchun universal yordamchi"}

            </h1>
            <p className="first_footer-text">
               <span className="footer_first">{footerFirst}</span>
               {language === "RU" ? (
                  <>
                     — универсальный справочник аптек для современного человека. Поисковый сервис помогает быстро
                     сэкономить время и деньги на приобретение лекарственных средств. Больше нет необходимости
                     самостоятельно ездить по городу, обзванивать множество аптек в поисках нужного препарата.
                     Достаточно воспользоваться справочником лекарств по Узбекистану.
                  </>
               ) : (
                  <>
                     - zamonaviy insonlar uchun qulay bo'lgan dori izlash tizimi, hamda dorixonalar
                     ma’lumotnomasi bo'lib, dori-darmon xaridiga sarf bo'ladigan vaqt va mablag'ni iqtisod
                     qilishga yordam beradi. Endi dori izlash uchun butun shahar bo'ylab yurishga va ko'plab
                     dorixonalarga qo'ng'iroq qilib chiqishga hojat yo'q. Oson Apteka dori izlash tizimidan
                     foydalanishni o'zi etarli bo'ladi.
                  </>
               )}
            </p>
         </div>
         <div className="first_footer">
            <h1 className="first_footer-about">
               {language === "RU" ? "Преимущества справочника лекарств" : "Dori izlash tizimi imkoniyatlari"}
            </h1>
            <p className="first_footer-text">






               {language === "RU" ? (
                  <>
                     Весь фармакологический бизнес построен на тесном
                     взаимодействии производителя и потребителя через
                     посредника — розничную сеть аптек. Когда речь идет
                     о здоровье и жизни (в прямом смысле слова), любые
                     промедления недопустимы. К сожалению, в реалиях
                     современной жизни, когда у человека попросту нет
                     времени на походы по аптекам, важно чтобы под рукой
                     всегда был быстрый поиск подходящего препарата в удаленном
                     режиме. Справочник лекарств <span className="footer_first">{footerFirst}</span>
                     выступает тем связующим звеном между клиентом и бизнесом.
                  </>
               ) : (
                  <>
                     Farmatsevtika biznesida ishlab chiqaruvchi va iste’molchi hamkorligi ular o'rtasidagi
                     vositachi – chakana savdoni amalga oshiruvchi dorixonalar orqali qurilgan.
                     Salomatlik va hayot (so'zning to'g'ridan-to'g'ri ma’nosida) xaqida so'z yuritilganda
                     hech qanday ikkilanish yoki paysalga solishga o'rin yo'q. Afsuski, hozirgi kun
                     voqeligida odamlarda dorixonama-dorixona yurishga vaqt yo'q va shunda kerakli
                     dorini masofadan turib tezlikda izlash imkoniyati juda muhim. Bu sharoitda
                     <span className="footer_first">{footerFirst}</span> dori izlash tizimi
                     farmatsevtika biznesi va iste’molchi o'rtasidagi bog'lab
                     turuvchi vosita sifatida juda qo'l keladi.
                  </>
               )}

            </p>
         </div>
      </footer>
   );
}
export default Footer
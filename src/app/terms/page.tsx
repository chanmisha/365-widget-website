import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Условия использования — 365 Виджет",
  description:
    "Условия использования приложения 365 Виджет: правила использования, лицензия, ответственность сторон.",
};

const SUPPORT_EMAIL = "support@365widget.ru";
const LAST_UPDATED = "7 апреля 2026 г.";

export default function TermsPage() {
  return (
    <div className="fixed inset-0 overflow-y-auto bg-[#0a0a0a] text-white/85">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <Link
          href="/"
          className="inline-block mb-10 text-xs sm:text-sm text-white/50 hover:text-white/80"
          style={{ transition: "color 200ms cubic-bezier(0.23, 1, 0.32, 1)" }}
        >
          ← На главную
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Условия использования
        </h1>
        <p className="text-xs sm:text-sm text-white/45 mb-12">
          Последнее обновление: {LAST_UPDATED}
        </p>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-white/75">
          <section>
            <p>
              Настоящие Условия использования (далее — «Условия») регулируют
              отношения между разработчиком приложения «365 Виджет» (далее —
              «Разработчик») и пользователем приложения и сайта{" "}
              <span className="text-white/90">365widget.ru</span> (далее —
              «Пользователь»). Устанавливая и используя Приложение, вы
              подтверждаете, что прочитали, поняли и согласились с настоящими
              Условиями.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              1. Лицензия
            </h2>
            <p>
              Разработчик предоставляет вам ограниченную, неисключительную,
              непередаваемую, отзывную лицензию на использование Приложения на
              устройствах Apple, владельцем или пользователем которых вы
              являетесь, в соответствии с условиями App Store (Apple Media
              Services Terms and Conditions).
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              2. Правила использования
            </h2>
            <p className="mb-3">Пользователь обязуется не:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Декомпилировать, реверс-инжинирить или иным образом пытаться получить исходный код Приложения;</li>
              <li>Использовать Приложение в незаконных целях;</li>
              <li>Распространять модифицированные версии Приложения;</li>
              <li>Использовать Приложение способами, нарушающими права третьих лиц.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              3. Покупки внутри приложения
            </h2>
            <p className="mb-3">
              Приложение содержит платный цифровой контент — отдельные календари,
              которые приобретаются разовой покупкой (не подписка). Каждый купленный
              календарь остаётся доступным на устройствах под вашим Apple ID без
              ограничения по времени.
            </p>
            <p className="mb-3">
              <span className="text-white/90">Способ оплаты для пользователей в России.</span>{" "}
              С 1 апреля 2026 года Apple Inc. приостановила обработку платежей в
              App Store на территории Российской Федерации. В связи с этим оплата
              цифрового контента в Приложении для российских пользователей
              осуществляется через лицензированную платёжную систему ЮKassa
              (ООО «НКО „ЮMoney"»), регулируемую Банком России. ЮKassa является
              стандартным платёжным решением, используемым большинством российских
              цифровых сервисов.
            </p>
            <p>
              <span className="text-white/90">Возвраты.</span> Запросы на возврат
              средств за покупки, совершённые через ЮKassa, направляйте на адрес{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-white underline underline-offset-4 hover:text-white/70"
              >
                {SUPPORT_EMAIL}
              </a>
              {" "}в течение 14 дней с момента покупки. Возвраты рассматриваются в
              соответствии с законом РФ «О защите прав потребителей».
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              4. Подписки
            </h2>
            <p>
              На момент публикации настоящих Условий Приложение не использует
              подписочную модель. Все покупки являются разовыми, без
              автоматического продления.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              5. Интеллектуальная собственность
            </h2>
            <p>
              Приложение, его дизайн, исходный код, графика, тексты и иные
              элементы являются объектами интеллектуальной собственности
              Разработчика и защищены законодательством РФ и международными
              соглашениями. Никакие положения настоящих Условий не передают
              Пользователю прав на интеллектуальную собственность, кроме права
              использования Приложения по назначению.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              6. Отказ от гарантий
            </h2>
            <p>
              Приложение предоставляется «как есть» (as is) без каких-либо
              гарантий, явных или подразумеваемых. Разработчик не гарантирует
              бесперебойную или безошибочную работу Приложения и не несёт
              ответственности за возможные неудобства, связанные с его
              использованием.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              7. Ограничение ответственности
            </h2>
            <p>
              В максимальной степени, разрешённой действующим законодательством,
              Разработчик не несёт ответственности за любые прямые, косвенные,
              случайные или последующие убытки, возникшие в результате
              использования или невозможности использования Приложения.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              8. Конфиденциальность
            </h2>
            <p>
              Обработка персональных данных регулируется{" "}
              <Link
                href="/privacy"
                className="text-white underline underline-offset-4 hover:text-white/70"
              >
                Политикой конфиденциальности
              </Link>
              , являющейся неотъемлемой частью настоящих Условий.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              9. Изменения условий
            </h2>
            <p>
              Разработчик оставляет за собой право изменять настоящие Условия
              в любое время. Актуальная версия всегда публикуется по адресу{" "}
              <span className="text-white/90">365widget.ru/terms</span>.
              Продолжение использования Приложения после внесения изменений
              означает согласие с обновлёнными Условиями.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              10. Применимое право
            </h2>
            <p>
              Настоящие Условия регулируются законодательством Российской
              Федерации. Все споры, возникающие в связи с использованием
              Приложения, подлежат разрешению в соответствии с применимым
              правом.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              11. Контакты
            </h2>
            <p>
              По всем вопросам, связанным с использованием Приложения,
              обращайтесь:{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-white underline underline-offset-4 hover:text-white/70"
              >
                {SUPPORT_EMAIL}
              </a>
            </p>
          </section>
        </div>

        <p className="mt-16 text-center text-white/25 text-[10px] sm:text-xs">
          © 2026 «365 Виджет»
        </p>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — 365 Виджет",
  description:
    "Политика конфиденциальности приложения 365 Виджет: какие данные мы собираем, как их используем и как защищаем.",
};

const SUPPORT_EMAIL = "support@365widget.ru";
const LAST_UPDATED = "7 апреля 2026 г.";

export default function PrivacyPage() {
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
          Политика конфиденциальности
        </h1>
        <p className="text-xs sm:text-sm text-white/45 mb-12">
          Последнее обновление: {LAST_UPDATED}
        </p>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-white/75">
          <section>
            <p>
              Настоящая Политика конфиденциальности описывает, как мобильное
              приложение «365 Виджет» (далее — «Приложение») и веб-сайт{" "}
              <span className="text-white/90">365widget.ru</span> (далее —
              «Сайт») собирают, используют и защищают информацию, относящуюся к
              пользователям. Используя Приложение или Сайт, вы соглашаетесь с
              условиями данной Политики.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              1. Какие данные мы собираем
            </h2>
            <p className="mb-3">
              Мы стремимся собирать минимально необходимый объём данных. В
              частности:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="text-white/90">Данные, которые вы вводите сами.</span>{" "}
                Например, заметки, события или настройки виджета. Эти данные
                хранятся локально на вашем устройстве и не передаются на наши
                серверы.
              </li>
              <li>
                <span className="text-white/90">Технические данные.</span>{" "}
                Версия операционной системы, модель устройства, язык и регион —
                используются исключительно для обеспечения корректной работы
                Приложения и диагностики ошибок.
              </li>
              <li>
                <span className="text-white/90">Данные о покупках.</span>{" "}
                В связи с тем, что с 1 апреля 2026 года Apple приостановила
                обработку платежей в App Store на территории России, оплата в
                Приложении для российских пользователей осуществляется через
                сервис ЮKassa (ООО «НКО „ЮMoney"», лицензия Банка России).
                Мы не получаем и не храним данные ваших банковских карт — все
                платежи обрабатываются на стороне ЮKassa. Для подтверждения
                покупок мы храним идентификатор устройства (identifierForVendor)
                и идентификатор платежа.
              </li>
              <li>
                <span className="text-white/90">Обращения в поддержку.</span>{" "}
                Если вы пишете нам по электронной почте, мы храним вашу
                переписку для ответа и улучшения сервиса.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              2. Геолокация
            </h2>
            <p>
              С вашего разрешения Приложение получает доступ к приблизительной
              геолокации (с округлением до ~11 км) исключительно для расчёта
              времени восхода и заката солнца, отображаемых в виджете и карточке
              дня. Координаты обрабатываются локально на устройстве и не
              передаются на наши серверы или третьим лицам.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              3. Что мы НЕ собираем
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Мы не получаем доступ к контактам, фото и микрофону.</li>
              <li>Мы не используем сторонние рекламные трекеры (нет ATT-фреймворка).</li>
              <li>Мы не продаём и не передаём ваши данные третьим лицам для маркетинга.</li>
              <li>Мы не отслеживаем вас между приложениями и сайтами.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              4. Как мы используем данные
            </h2>
            <p>
              Собранные данные используются исключительно для предоставления
              функциональности Приложения, обработки покупок, восстановления
              ранее купленного контента на новых устройствах, обеспечения
              технической поддержки и улучшения качества сервиса.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              5. Хранение и защита данных
            </h2>
            <p>
              Купленные календари и пользовательские настройки хранятся локально
              на устройстве в защищённом контейнере iOS (SwiftData). Идентификатор
              устройства и идентификаторы платежей хранятся в Keychain и iCloud
              Key-Value Store, что обеспечивает синхронизацию покупок между вашими
              устройствами. Мы применяем технические и организационные меры для
              защиты данных от несанкционированного доступа.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              6. Сторонние сервисы
            </h2>
            <p className="mb-3">
              Приложение использует следующие сторонние сервисы:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="text-white/90">Apple Inc.</span> — App Store, StoreKit,
                WidgetKit, iCloud Key-Value Store. Распространение приложения и
                стандартные системные API.
              </li>
              <li>
                <span className="text-white/90">ЮKassa (ООО «НКО „ЮMoney"»).</span>{" "}
                Обработка платежей для пользователей в России. Подчиняется
                российскому законодательству о персональных данных и регулируется
                Банком России. Политика конфиденциальности:{" "}
                <a
                  href="https://yookassa.ru/legal/fz-152"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline underline-offset-4 hover:text-white/70"
                >
                  yookassa.ru/legal/fz-152
                </a>
                .
              </li>
              <li>
                <span className="text-white/90">Supabase.</span> Хостинг каталога
                календарей и контента. Запросы передают идентификатор устройства
                для проверки покупок. Не передаются персональные данные,
                позволяющие идентифицировать вас.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              7. Права пользователей
            </h2>
            <p>
              В соответствии с действующим законодательством Российской
              Федерации (152-ФЗ «О персональных данных») вы имеете право
              запросить информацию о хранящихся данных, потребовать их
              исправления или удаления. Для этого напишите нам на адрес{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-white underline underline-offset-4 hover:text-white/70"
              >
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              8. Дети
            </h2>
            <p>
              Приложение не предназначено для детей младше 13 лет и не собирает
              сознательно их персональные данные.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              9. Изменения политики
            </h2>
            <p>
              Мы можем периодически обновлять настоящую Политику. Актуальная
              версия всегда доступна по адресу{" "}
              <span className="text-white/90">365widget.ru/privacy</span>. Дата
              последнего обновления указана в верхней части страницы.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">
              10. Контакты
            </h2>
            <p>
              По всем вопросам, связанным с обработкой персональных данных,
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

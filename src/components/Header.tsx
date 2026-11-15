import { Clock, Flame, Info, MapPin, Truck, Utensils } from "lucide-react";
import { restaurantConfig } from "@/config/restaurant";
import { formatCurrency } from "@/lib/currency";

export function Header() {
  return (
    <header className="border-b border-[#D8C7B4] bg-[#EFE3D3]">
      {/* Faixa de aviso de dados de demonstração */}
      <div
        role="note"
        aria-label="Aviso de projeto de demonstração"
        className="border-b border-[#D8C7B4] bg-[#231913] px-4 py-2 text-xs text-[#F6EFE6]"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 text-center">
          <Info
            className="h-3.5 w-3.5 shrink-0 text-[#E5A965]"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <p className="leading-snug">{restaurantConfig.demoNotice}</p>
        </div>
      </div>

      {/* Cabeçalho principal rústico */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-4 sm:gap-5">
            {/* Emblema geométrico em vetor de olaria e brasa */}
            <div
              aria-hidden="true"
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#C6AF95] bg-[#FAF5EE] text-[#9E3B1E] sm:h-20 sm:w-20"
            >
              <svg
                viewBox="0 0 64 64"
                className="h-11 w-11 sm:h-13 sm:w-13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="27"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="22"
                  stroke="#B87624"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <path
                  d="M18 35C18 42.732 24.268 48 32 48C39.732 48 46 42.732 46 35H18Z"
                  fill="#9E3B1E"
                  fillOpacity="0.16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 35H49"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M26 28C26 24 29 22 29 18M32 29C32 24 35 21 35 16M38 28C38 25 40 23 40 19"
                  stroke="#B87624"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-display text-3xl font-bold tracking-tight text-[#231913] sm:text-4xl lg:text-[2.75rem]">
                  {restaurantConfig.name}
                </h1>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#3A5332]/30 bg-[#E4EBDD] px-3 py-1 text-xs font-medium text-[#2A3F23]">
                  <Flame
                    className="h-3.5 w-3.5 text-[#3A5332]"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  {restaurantConfig.schedule.kitchenStatus}
                </span>
              </div>

              <p className="font-display text-lg font-medium text-[#7E2C14] sm:text-xl">
                {restaurantConfig.subtitle}
              </p>

              <p className="max-w-2xl text-sm leading-relaxed text-[#5A4638] sm:text-base">
                {restaurantConfig.tagline}
              </p>
            </div>
          </div>

          {/* Quadro de informações operacionais do atendimento */}
          <dl className="grid grid-cols-1 gap-2.5 rounded-2xl border border-[#D8C7B4] bg-[#FAF5EE] p-4 text-sm text-[#5A4638] sm:grid-cols-3 lg:w-auto lg:min-w-[460px] lg:grid-cols-1 xl:grid-cols-3">
            <div className="flex items-start gap-2.5">
              <Truck
                className="mt-0.5 h-4 w-4 shrink-0 text-[#9E3B1E]"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <div>
                <dt className="font-semibold text-[#231913]">Taxa de entrega</dt>
                <dd className="tabular-nums text-xs text-[#5A4638]">
                  Fixa {formatCurrency(restaurantConfig.delivery.fixedFee)} (
                  {restaurantConfig.delivery.estimatedDeliveryTime})
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Utensils
                className="mt-0.5 h-4 w-4 shrink-0 text-[#3A5332]"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <div>
                <dt className="font-semibold text-[#231913]">
                  Retirada no local
                </dt>
                <dd className="text-xs text-[#5A4638]">
                  Sem taxa ({restaurantConfig.delivery.estimatedPickupTime})
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock
                className="mt-0.5 h-4 w-4 shrink-0 text-[#B87624]"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <div>
                <dt className="font-semibold text-[#231913]">
                  {restaurantConfig.schedule.days}
                </dt>
                <dd className="tabular-nums text-xs text-[#5A4638]">
                  {restaurantConfig.schedule.hours}
                </dd>
              </div>
            </div>
          </dl>
        </div>

        {/* Endereço de demonstração */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[#D8C7B4] pt-4 text-xs text-[#5A4638]">
          <p className="flex items-center gap-1.5">
            <MapPin
              className="h-3.5 w-3.5 shrink-0 text-[#9E3B1E]"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <span>
              <strong className="font-semibold text-[#231913]">
                Endereço de retirada:
              </strong>{" "}
              {restaurantConfig.address.street} — {restaurantConfig.address.city}{" "}
              · {restaurantConfig.address.reference}
            </span>
          </p>
          <p className="tabular-nums">
            Atendimento WhatsApp: {restaurantConfig.contact.displayPhone}
          </p>
        </div>
      </div>
    </header>
  );
}


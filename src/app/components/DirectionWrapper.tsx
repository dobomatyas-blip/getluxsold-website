import { Locale, isRtl } from "../i18n/types";

interface DirectionWrapperProps {
  locale: Locale;
  children: React.ReactNode;
}

export default function DirectionWrapper({ locale, children }: DirectionWrapperProps) {
  return <div dir={isRtl(locale) ? "rtl" : "ltr"}>{children}</div>;
}

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getItem } from './storage/session';

const resources = {
  en: {
    translation: {
      "reward-title-paragraph": "Reward percentage",
      "reward-paragraph": "We will offer you the best interest on the market set at",
      "unbound-title-paragraph": "Withdrawal period",
      "unbound-paragraph-1": "You can withdraw your money in",
      "unbound-paragraph-2": "after the request!",
      "days": "days",
      "minimum-amount": "Minimum amount",
      "minimum-amount-paragraph": "You can start delegating with minimum",
      "amount": "How much EGLD will you stake?",
      "daily": "Daily",
      "weekly": "Weekly",
      "monthly": "Monthly",
      "yearly": "Yearly",
      "current-value": "Current Value",
      "paid-daily": "Paid (~0.054%) daily in rewards",
      "delegate": "Staking",
    }
  },
  ro: {
    translation: {
      "reward-title-paragraph": "Procentaj primit pe an",
      "reward-paragraph": "Iti oferim cea mai bună dobandă din piață stabilită la",
      "unbound-title-paragraph": "Perioadă de retragere",
      "unbound-paragraph-1": "Puteți retrage banii în",
      "unbound-paragraph-2": "după solicitare!",
      "days": "zile",
      "minimum-amount": "Sumă minimă",
      "minimum-amount-paragraph": "Puteți începe să delegați cu minimum",
      "amount": "Câti EGLD veți depozita?",
      "daily": "Zilnic",
      "weekly": "Săptămânal",
      "monthly": "Lunar",
      "yearly": "Anual",
      "current-value": "Valoare curentă",
      "paid-daily": "Plătit (~0.054%) zilnic in recompense",
      "delegate": "Depozitează",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    supportedLngs: ['de','en','fr','it', 'ro'],
    lng: getItem("LNG") || 'en',
    resources,
    fallbackLng: 'en'
  });

export default i18n;
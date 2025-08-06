import { version } from 'config';
import packageInfo from '../../package.json';

const { homepage } = packageInfo;

export const faqs = [
  {
    id: 0,
    title: `How does Falcon's pricing work?`,
    description: `The free version of Falcon is available for teams of up to 15 people. Our Falcon Premium plans of 15 or fewer qualify for a small team discount. As your team grows to 20 users or more and gets more value out of Falcon, you'll get closer to our standard monthly price per seat. The price of a paid Falcon plan is tiered, starting in groups of 5 and 10 users, based on the number of people you have in your Team or Organization.`
  },
  {
    id: 1,
    title: 'What forms of payment do you accept?',
    description: `You can purchase Falcon with any major credit card. For annual subscriptions, we can issue an invoice payable by bank transfer or check. Please contact us to arrange an invoice purchase. Monthly purchases must be paid for by credit card.`
  },
  {
    id: 2,
    title: 'We need to add more people to our team. How will that be billed?',
    description: `You can add as many new teammates as you need before changing your subscription. We will subsequently ask you to correct your subscription to cover current usage.`
  },
  {
    id: 3,
    title: `How secure is Falcon?`,
    description: `Protecting the data you trust to Falcon is our first priority. Falcon uses physical, procedural, and technical safeguards to preserve the integrity and security of your information. We regularly back up your data to prevent data loss and aid in recovery. Additionally, we host data in secure SSAE 16 / SOC1 certified data centers, implement firewalls and access restrictions on our servers to better protect your information, and work with third party security researchers to ensure our practices are secure.`
  },
  {
    id: 4,
    title: `Will I be charged sales tax?`,
    description: `As of May 2016, state and local sales tax will be applied to fees charged to customers with a billing address in the State of New York.`
  },
  {
    id: 5,
    title: `Do you offer discounts?`,
    description: `We've built in discounts at each tier for teams smaller than 15 members. We also offer two months for free in exchange for an annual subscription.`
  },
  {
    id: 6,
    title: `Do you offer academic pricing?`,
    description: `We're happy to work with student groups using Falcon. Contact Us`
  },
  {
    id: 7,
    title: `Is there an on-premise version of Falcon?`,
    description: `We are passionate about the web. We don't plan to offer an internally hosted version of Falcon. We hope you trust us to provide a robust and secure service so you can do the work only your team can do.`
  },
  {
    id: 8,
    title: `What is your refund policy?`,
    description: `We do not offer refunds apart from exceptions listed below. If you cancel your plan before the next renewal cycle, you will retain access to paid features until the end of your subscription period. When your subscription expires, you will lose access to paid features and all data associated with those features. Exceptions to our refund policy: canceling within 48 hours of initial charge will result in a full refund. If you cancel within this timeframe, you will lose access to paid features and associated data immediately upon canceling.`
  }
];

export const faqAccordions = [
  {
    id: 0,
    title: 'How long do payouts take?',
    description:
      '<p class = "mb-0">Once you’re set up, payouts arrive in your bank account on a 2-day rolling basis. Or you can opt to receive payouts weekly or monthly.</p>'
  },
  {
    id: 1,
    title: 'How do refunds work?',
    description:
      '<p class = "mb-0">You can issue either partial or full refunds. There are no fees to refund a charge, but the fees from the original charge are not returned.</p>'
  },
  {
    id: 2,
    title: 'How much do disputes costs?',
    description:
      '<p class = "mb-0">Disputed payments (also known as chargebacks) incur a $15.00 fee. If the customer’s bank resolves the dispute in your favor, the fee is fully refunded.</p>'
  },
  {
    id: 3,
    title: 'Is there a fee to use Apple Pay or Google Pay?',
    description:
      '<p class = "mb-0">There are no additional fees for using our mobile SDKs or to accept payments using consumer wallets like Apple Pay or Google Pay.</p>'
  }
];

export const faqDoc = [
  {
    category: 'General',
    items: [
      {
        id: 1,
        title: 'What is the main goal of the DICC?',
        description: `<p class='mb-0'>To provide seamless citizen support across India for Digital India schemes via a centralized call center.</p>`
      },
      {
        id: 2,
        title: 'What types of services will the call center handle?',
        description: `<p>Inbound/outbound calls, email support, IVRS assistance, CRM integration, and multilingual support.</p>`
      }
    ]
  },
  {
    category: 'CCE Responsibilities',
    items: [
      {
        id: 3,
        title: 'What are the responsibilities of a CCE?',
        description: `<p>Handle citizen queries, update CRM, gather feedback, maintain data privacy, and ensure accurate reporting.</p>`
      },
      {
        id: 4,
        title: 'What is the working shift for the initial deployment?',
        description: `<p>One shift from 9:00 AM to 6:00 PM, 365 days a year.</p>`
      },
      {
        id: 5,
        title: 'How many CCEs will be deployed initially?',
        description: `<p>35 seats per shift.</p>`
      },
      {
        id: 6,
        title: 'What is the language requirement for CCEs?',
        description: `<p>Hindi, English, and at least one of the regional languages like Marathi, Odia, Tamil, or Telugu.</p>`
      }
    ]
  },
  {
    category: 'Technology & Integration',
    items: [
      {
        id: 7,
        title: 'What systems must the call center integrate with?',
        description: `<p>CRM, IVRS, and APIs for real-time data exchange.</p>`
      },
      {
        id: 8,
        title: 'What is the purpose of CRM-IVRS integration?',
        description: `<p>To capture caller details, feedback, call history, and route calls efficiently.</p>`
      }
    ]
  },
  {
    category: 'Infrastructure and Tools',
    items: [
      {
        id: 9,
        title: 'Who provides the call center premises and utilities?',
        description: `<p>NeGD will provide premises, electricity, water, and connectivity.</p>`
      },
      {
        id: 10,
        title: 'What must the service provider install?',
        description: `<p>Headsets, desktops, telephony systems, CRM software, and monitoring tools.</p>`
      }
    ]
  },
  {
    category: 'Security and Compliance',
    items: [
      {
        id: 11,
        title: 'What certifications must the call center obtain?',
        description: `<p>ISO 27001:2022 within six months of Go-Live.</p>`
      },
      {
        id: 12,
        title: 'Who is responsible for data security?',
        description: `<p>The service provider, including periodic CERT-In/STQC audits.</p>`
      }
    ]
  },
  {
    category: 'Training and Evaluation',
    items: [
      {
        id: 13,
        title: 'What training is required for CCEs?',
        description: `<p>Language proficiency, system usage, data handling, and typing test (25 WPM, 90% accuracy).</p>`
      },
      {
        id: 14,
        title: 'How is training evaluated?',
        description: `<p>Through tests after a 7-day training period and continuous QA assessments.</p>`
      }
    ]
  },
  {
    category: 'Reporting and Dashboard Use',
    items: [
      {
        id: 15,
        title: 'What types of reports should the system generate?',
        description: `<p>Call volume, agent performance, queue analysis, SLA compliance, and MIS reports.</p>`
      },
      {
        id: 16,
        title: 'What should the dashboard display?',
        description: `<p>Active calls, CCE status, call queue, dropped calls, and performance metrics.</p>`
      }
    ]
  },
];

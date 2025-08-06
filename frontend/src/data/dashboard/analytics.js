import chromeLogo from 'assets/img/icons/chrome-logo.png';
import firefoxLogo from 'assets/img/icons/firefox-logo.png';
import safariLogo from 'assets/img/icons/safari-logo.png';
import { faCheck, faClock, faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export const audienceChart = {
  users: [
    [504, 333, 400, 606, 451, 685, 404],
    [237, 229, 707, 575, 420, 536, 258]
  ],
  sessions: [
    [322, 694, 235, 537, 791, 292, 806],
    [584, 661, 214, 286, 526, 707, 627]
  ],
  rate: [
    [789, 749, 412, 697, 633, 254, 472],
    [276, 739, 525, 394, 643, 653, 719]
  ],
  duration: [
    [625, 269, 479, 654, 549, 305, 671],
    [499, 670, 550, 222, 696, 695, 469]
  ]
};

export const realTimeUsers = [
  {
    page: 'Network Connectivity Problem',
    count: 13
  },
  {
    page: 'Software Installation Failed',
    count: 10
  },
  {
    page: 'VPN/Remote Access Issues',
    count: 30
  },
  {
    page: 'Application Error',
    count: 333
  },
  {
    page: 'Login Issues',
    count: 12
  },
  {
    page: 'System Not Responding',
    count: 50
  }
];

export const sessionByBrowser = [
  {
    icon: chromeLogo,
    label: 'Chrome',
    value: '50.3%',
    progress: false,
    caret: 'fas fa-caret-down text-danger',
    color: 'primary',
    progressValue: '2.9%'
  },
  {
    icon: safariLogo,
    label: 'Safari',
    value: '30.1%',
    progress: true,
    caret: 'fas fa-caret-up text-success',
    color: 'success',
    progressValue: '29.4%'
  },
  {
    icon: firefoxLogo,
    label: 'Mozilla',
    value: '20.6%',
    progress: true,
    caret: 'fas fa-caret-up text-success',
    color: 'info',
    progressValue: '220.7%'
  }
];

export const sessionByCountry = [
  ['CHINA', 'INDIA', 'USA', 'IRAN', 'BRAZIL', 'PAKISTAN'],
  [19.53, 17.32, 4.49, 3.46, 2.8, 1.7]
];

export const intelligence = [
  {
    title: 'Content Analysis',
    icon: 'code-branch',
    description:
      'Which landing pages with over 10 sessions have the worst bounce rates?'
  },
  {
    title: 'Technical performance',
    icon: 'bug',
    description:
      'Show me a trend of my average page load time over the last 3 months'
  },
  {
    title: 'Where you get your users from',
    icon: 'project-diagram',
    description: 'What are my top default channel groupings by user?'
  },
  {
    title: 'Geographic Analysis',
    icon: 'map-marker-alt',
    description: 'What pages do people from California go to the most?'
  }
];

export const activeUsersChart = {
  mobile: [
    4164, 4652, 4817, 4841, 4920, 5439, 5486, 5498, 5512, 5538, 5841, 5877,
    6086, 6146, 6199, 6431, 6704, 7939, 8127, 8296, 8322, 8389, 8411, 8502,
    8868, 8977, 9273, 9325, 9345, 9430
  ],
  desktop: [
    2164, 2292, 2386, 2430, 2528, 3045, 3255, 3295, 3481, 3604, 3688, 3840,
    3932, 3949, 4003, 4298, 4424, 4869, 4922, 4973, 5155, 5267, 5566, 5689,
    5692, 5758, 5773, 5799, 5960, 6000
  ],
  tablet: [
    1069, 1089, 1125, 1141, 1162, 1179, 1185, 1216, 1274, 1322, 1346, 1395,
    1439, 1564, 1581, 1590, 1656, 1815, 1868, 2010, 2133, 2179, 2264, 2265,
    2278, 2343, 2354, 2456, 2472, 2480
  ]
};

export const campaignTable = [
  {
    id: 1,
    campaigns: 'Black Friday Sale',
    cost: 1304.28,
    revenue: 543217.65
  },
  {
    id: 2,
    campaigns: 'Christmas Bundle',
    cost: 9876.56,
    revenue: 3904.0
  },
  {
    id: 3,
    campaigns: 'Halloween Party Started 🎃 👻',
    cost: 3267.84,
    revenue: 7654.8
  },
  {
    id: 4,
    campaigns: 'Grab your reward',
    cost: 87545.28,
    revenue: 68654.35
  },
  {
    id: 5,
    campaigns: 'Black Friday Sale',
    cost: 1304.28,
    revenue: 3904.0
  },
  {
    id: 6,
    campaigns: 'Boxing Day offer',
    cost: 1200.5,
    revenue: 5004.87
  }
];

export const campaignChart = {
  revenue: [10100, 16500, 14000, 16200, 12100, 19000, 13900],
  clicks: [119, 199, 195, 101, 155, 131, 180]
};

export const bounceRate = [
  40, 37, 42, 44, 36, 39, 37, 43, 38, 35, 43, 39, 42, 36, 37, 36, 42, 44, 34,
  41, 37, 41, 40, 40, 43, 34, 41, 35, 44, 41, 40
];

export const stats = [
  {
    title: 'Active Calls',
    value: 14,
    chartData: [
      172, 129, 123, 158, 196, 106, 187, 198, 152, 175, 178, 165, 188, 139, 115,
      131, 143, 140, 112, 167, 180, 156, 121, 190, 100
    ],
    grid: { right: '16px', left: '0', bottom: '0', top: '0' }
  },
  {
    title: 'Active Emails',
    value: '100',
    chartData: [
      170, 156, 171, 193, 108, 178, 163, 175, 117, 123, 174, 199, 122, 111, 113,
      140, 192, 167, 186, 172, 131, 187, 135, 115, 118
    ],
    grid: { right: '16px', left: '16px', bottom: '0', top: '0' }
  },
  {
    title: 'Active Chats',
    value: '20',
    chartData: [
      199, 181, 155, 164, 108, 158, 117, 148, 121, 152, 189, 116, 111, 130, 113,
      171, 193, 104, 110, 153, 190, 162, 180, 114, 183
    ],
    grid: { right: '0', left: '16px', bottom: '0', top: '0' }
  }
];

export const topPagesTableData = [
  {
    agentName: 'Ravi Sharma',
    agentId: 'A001',
    AvgWorkHour: '7h 15m',
    asa: '8m 15s',
    talkTime: '6m 10s',
    handlingTime: '7m 05s',
    holdTime: '1m 10s',
    wrapUpTime: '40s',
    droppedBefore: 2,
    droppedAfter: 0,
    idleTime: '75m',
    noAnswer: 1
  },
  {
    agentName: 'Priya Mehta',
    agentId: 'A002',
    AvgWorkHour: '6h 50m',
    asa: '12m 30s',
    talkTime: '5m 45s',
    handlingTime: '6m 30s',
    holdTime: '1m 05s',
    wrapUpTime: '38s',
    droppedBefore: 0,
    droppedAfter: 1,
    idleTime: '65m',
    noAnswer: 3
  },
  {
    agentName: 'Amit Verma',
    agentId: 'A003',
    AvgWorkHour: '6h 20m',
    asa: '9m 45s',
    talkTime: '5m 00s',
    handlingTime: '6m 00s',
    holdTime: '0m 55s',
    wrapUpTime: '30s',
    droppedBefore: 3,
    droppedAfter: 1,
    idleTime: '90m',
    noAnswer: 0
  },
  {
    agentName: 'Neha Iyer',
    agentId: 'A004',
    AvgWorkHour: '7h 00m',
    asa: '11m 10s',
    talkTime: '5m 30s',
    handlingTime: '6m 40s',
    holdTime: '1m 25s',
    wrapUpTime: '42s',
    droppedBefore: 1,
    droppedAfter: 2,
    idleTime: '68m',
    noAnswer: 1
  },
  {
    agentName: 'Karan Patel',
    agentId: 'A005',
    AvgWorkHour: '6h 45m',
    asa: '7m 05s',
    talkTime: '6m 25s',
    handlingTime: '7m 10s',
    holdTime: '0m 45s',
    wrapUpTime: '37s',
    droppedBefore: 0,
    droppedAfter: 1,
    idleTime: '50m',
    noAnswer: 2
  },
  {
    agentName: 'Sonal Gupta',
    agentId: 'A006',
    AvgWorkHour: '6h 40m',
    asa: '10m 20s',
    talkTime: '5m 50s',
    handlingTime: '6m 35s',
    holdTime: '1m 05s',
    wrapUpTime: '35s',
    droppedBefore: 1,
    droppedAfter: 0,
    idleTime: '72m',
    noAnswer: 1
  },
  {
    agentName: 'Vikram Singh',
    agentId: 'A007',
    AvgWorkHour: '7h 10m',
    asa: '9m 30s',
    talkTime: '6m 15s',
    handlingTime: '7m 00s',
    holdTime: '1m 00s',
    wrapUpTime: '39s',
    droppedBefore: 0,
    droppedAfter: 2,
    idleTime: '60m',
    noAnswer: 0
  },
  {
    agentName: 'Anjali Rao',
    agentId: 'A008',
    AvgWorkHour: '6h 55m',
    asa: '11m 05s',
    talkTime: '5m 40s',
    handlingTime: '6m 20s',
    holdTime: '1m 15s',
    wrapUpTime: '33s',
    droppedBefore: 2,
    droppedAfter: 1,
    idleTime: '66m',
    noAnswer: 2
  },
  {
    agentName: 'Rohan Desai',
    agentId: 'A009',
    AvgWorkHour: '6h 30m',
    asa: '8m 40s',
    talkTime: '6m 00s',
    handlingTime: '6m 50s',
    holdTime: '0m 55s',
    wrapUpTime: '41s',
    droppedBefore: 1,
    droppedAfter: 0,
    idleTime: '70m',
    noAnswer: 1
  },
  {
    agentName: 'Meera Joshi',
    agentId: 'A010',
    AvgWorkHour: '7h 05m',
    asa: '10m 50s',
    talkTime: '5m 55s',
    handlingTime: '6m 40s',
    holdTime: '1m 10s',
    wrapUpTime: '36s',
    droppedBefore: 0,
    droppedAfter: 1,
    idleTime: '64m',
    noAnswer: 0
  }
];

export const buttonsTableData = [
  {
    agentName: 'Ravi Sharma',
    agentId: 'A001',
    day1Login: '09:00 AM',
    day1Logout: '06:30 PM',
    day2Login: '09:15 AM',
    day2Logout: '06:45 PM',
    day3Login: '09:10 AM',
    day3Logout: '06:50 PM',
    day4Login: '09:05 AM',
    day4Logout: '06:40 PM',
    day5Login: '09:20 AM',
    day5Logout: '06:55 PM',
    day6Login: '09:00 AM',
    day6Logout: '07:00 PM',
    day7Login: '09:30 AM',
    day7Logout: '06:20 PM'
  },
  {
    agentName: 'Anita Patel',
    agentId: 'A002',
    day1Login: '09:05 AM',
    day1Logout: '06:10 PM',
    day2Login: '09:10 AM',
    day2Logout: '06:25 PM',
    day3Login: '09:00 AM',
    day3Logout: '06:30 PM',
    day4Login: '09:15 AM',
    day4Logout: '06:35 PM',
    day5Login: '09:25 AM',
    day5Logout: '06:45 PM',
    day6Login: '09:20 AM',
    day6Logout: '06:50 PM',
    day7Login: '09:10 AM',
    day7Logout: '06:15 PM'
  },
  {
    agentName: 'Vikram Singh',
    agentId: 'A003',
    day1Login: '09:30 AM',
    day1Logout: '06:40 PM',
    day2Login: '09:45 AM',
    day2Logout: '06:55 PM',
    day3Login: '09:35 AM',
    day3Logout: '06:50 PM',
    day4Login: '09:40 AM',
    day4Logout: '06:45 PM',
    day5Login: '09:50 AM',
    day5Logout: '06:35 PM',
    day6Login: '09:30 AM',
    day6Logout: '06:55 PM',
    day7Login: '09:45 AM',
    day7Logout: '06:40 PM'
  }
];

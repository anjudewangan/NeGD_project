import { getDates } from 'helpers/utils';
import open from 'assets/img/icons/open.png';
import pending from 'assets/img/icons/pending.png';
import newTicket from 'assets/img/icons/new.png';
import escalated from 'assets/img/icons/escalated.png';
import closed from 'assets/img/icons/closed.png';
import india from 'assets/img/country/india.png';
import uae from 'assets/img/country/uae.png';
import nepal from 'assets/img/country/nepal.png';
import thailand from 'assets/img/country/thailand.png';
import team1 from 'assets/img/team/1-thumb.png';
import team2 from 'assets/img/team/2-thumb.png';
import team3 from 'assets/img/team/3-thumb.png';
import team4 from 'assets/img/team/4-thumb.png';
import team5 from 'assets/img/team/5-thumb.png';

export const statsData = [
  {
    id: 1,
    title: 'New Tickets',
    amount: 25,
    // target: '2500 vs 2683',
    icon: 'file',
    caret: 'caret-up',
    color: 'primary',
    caretColor: 'primary',
    data: [220, 230, 150, 175, 200, 170, 70, 160]
  },
  {
    id: 2,
    title: 'Open Tickets',
    amount: 15,
    // target: '1635 vs 863',
    icon: 'eye',
    caret: 'caret-up',
    color: 'danger',
    caretColor: 'danger',
    data: [90, 160, 150, 120, 230, 155, 220, 240]
  },
  {
    id: 3,
    title: 'Closed Tickets',
    amount: 10,
    // target: '1423 vs 256',
    icon: 'times',
    caret: 'caret-down',
    color: 'success',
    caretColor: 'success',
    data: [200, 150, 175, 130, 150, 115, 130, 100]
  }
];

export const revenueChartData = {
  dates: getDates(
    new Date('5-6-2019'),
    new Date('5-6-2021'),
    1000 * 60 * 60 * 24 * 30
  ),
  dataset: {
    revenue: [
      [
        645, 500, 550, 550, 473, 405, 286, 601, 743, 450, 604, 815, 855, 722,
        700, 896, 866, 952, 719, 558, 737, 885, 972, 650, 600
      ],
      [
        440, 250, 270, 400, 175, 180, 200, 400, 600, 380, 340, 550, 650, 450,
        400, 688, 650, 721, 500, 300, 445, 680, 568, 400, 371
      ]
    ],
    users: [
      [
        545, 500, 650, 727, 773, 705, 686, 501, 643, 580, 604, 615, 755, 722,
        727, 816, 836, 952, 719, 758, 937, 785, 872, 850, 800
      ],
      [
        340, 360, 230, 250, 410, 430, 450, 200, 220, 540, 500, 250, 355, 320,
        500, 630, 680, 500, 520, 550, 750, 720, 700, 780, 750
      ]
    ],
    deals: [
      [
        545, 400, 450, 627, 473, 450, 460, 780, 770, 800, 504, 550, 500, 530,
        727, 716, 736, 820, 719, 758, 737, 885, 872, 850, 800
      ],
      [
        245, 300, 450, 427, 273, 250, 260, 580, 570, 500, 402, 450, 400, 330,
        527, 516, 536, 620, 519, 558, 537, 483, 472, 250, 300
      ]
    ],
    profit: [
      [
        545, 400, 450, 627, 673, 605, 686, 501, 843, 518, 504, 715, 955, 622,
        627, 716, 736, 952, 619, 558, 937, 785, 872, 550, 400
      ],
      [
        340, 360, 330, 300, 410, 380, 450, 400, 420, 240, 200, 250, 355, 320,
        500, 630, 680, 400, 420, 450, 650, 620, 700, 450, 340
      ]
    ]
  }
};

export const leadsData = [
  {
    id: 1,
    title: 'New',
    target: '5200 vs 1052',
    img: newTicket,
    amount: 15
  },
  {
    id: 2,
    title: 'Open',
    target: '5623 vs 4929',
    img: open,
    amount: 20
  },
  {
    id: 3,
    title: 'Pending',
    target: '2535 vs 1486',
    img: pending,
    amount: 8
  },
  {
    id: 4,
    title: 'Closed',
    target: '256 vs 189',
    img: closed,
    amount: 30
  },
  {
    id: 5,
    title: 'Escalated',
    target: '256 vs 189',
    img: escalated,
    amount: 30
  }
];

export const dealForecastData = [
  {
    id: 1,
    title: 'Unassigned Emails',
    amount: 90,
    variant: 'progress-gradient'
  },
  {
    id: 2,
    title: 'Total Emails Received',
    amount: 68,
    variant: 'primary-subtle'
  },
  {
    id: 3,
    title: 'Agent Chat Volume',
    amount: 40,
    variant: 'info-subtle'
  },
  {
    id: 4,
    title: 'Chat Keyword Trends',
    amount: 61,
    variant: 'info'
  }
];

export const dealClosedVsGoalChart = {
  closedAmount: [0, 5000, 18000, 40000, 58000, 65000, 90000, 110000, 140000],
  revenueGoal: [0, 10000, 24000, 35000, 45000, 53000, 57000, 68000, 79000]
};

export const dealForecastByOwnerData = [
  {
    id: 1,
    owner: 'Rajesh Sharma',
    qualifiedItem: 1000,
    appointment: 2600,
    contactSent: 3523,
    closedWon: 1311
  },
  {
    id: 2,
    owner: 'Monika Singh',
    qualifiedItem: 1500,
    appointment: 1600,
    contactSent: 3523,
    closedWon: 2311
  },
  {
    id: 3,
    owner: 'Arun Sen',
    qualifiedItem: 1400,
    appointment: 2200,
    contactSent: 3523,
    closedWon: 3311
  },
  {
    id: 4,
    owner: 'Payal Jain',
    qualifiedItem: 6600,
    appointment: 2220,
    contactSent: 3523,
    closedWon: 1511
  }
];

export const locationBySessionTableData = [
  {
    country: 'Maharashtra',
    flag: india,
    sessions: '268,663',
    users: '325,633',
    percentage: 89
  },
  {
    country: 'Bihar',
    flag: india,
    sessions: '250,663',
    users: '525,633',
    percentage: 62
  },
  {
    country: 'Odhisha',
    flag: india,
    sessions: '268,663',
    users: '325,633',
    percentage: 50
  },
  {
    country: 'Chhattisgarh',
    flag: india,
    sessions: '68,663',
    users: '35,633',
    percentage: 89
  },
  {
    country: 'Asam',
    flag: india,
    sessions: '10,663',
    users: '5,633',
    percentage: 62
  },
  {
    country: 'Tamil Nadu',
    flag: india,
    sessions: '368,663',
    users: '15,633',
    percentage: 50
  },
  {
    country: 'Andhra Pradesh',
    flag: india,
    sessions: '197,554',
    users: '215,303',
    percentage: 42
  },
  {
    country: 'Rajastan',
    flag: india,
    sessions: '197,554',
    users: '215,303',
    percentage: 35
  },
  {
    country: 'Punjab',
    flag: india,
    sessions: '28,663',
    users: '35,633',
    percentage: 65
  },
  {
    country: 'Kerala',
    flag: india,
    sessions: '17,554',
    users: '5,303',
    percentage: 35
  }
];

export const toDoList = [
  {
    id: 1,
    task: 'Design a ad',
    completed: false
  },
  {
    id: 2,
    task: 'Analyze Data',
    completed: false
  },
  {
    id: 3,
    task: 'Youtube campaign',
    completed: false
  },
  {
    id: 4,
    task: 'Assaign employee',
    completed: false
  },
  {
    id: 5,
    task: 'Video Conference',
    completed: false
  }
];

export const recentLeadsTableData = [
  {
    name: 'Shivani Kashyap',
    img: team1,
    email: 'shivani120@gmail.com',
    status: 'On Call',
    callDuration: '00:08:42',
    queueLength: '3',
    activeTickets: '1',
    variant: 'primary'
  },
  {
    name: 'Shiv Narayan',
    img: team2,
    email: 'shivnarayan20@mail.com',
    status: 'On Call',
    callDuration: '00:01:42',
    queueLength: '5',
    activeTickets: '0',
    variant: 'primary'
  },
  {
    name: 'Payal Jain',
    img: team3,
    email: 'jainpayal85@gmail.com',
    status: 'Break',
    callDuration: '00:05:42',
    queueLength: '3',
    activeTickets: '4',
    variant: 'warning'
  },
  {
    name: 'Ajay Singh',
    img: team4,
    email: 'ajay1232@gmail.com',
    status: 'Break',
    callDuration: '00:02:42',
    queueLength: '8',
    activeTickets: '2',
    variant: 'warning'
  },
  {
    name: 'Ashok Kumar',
    img: team5,
    email: 'ashok8965@gmail.com',
    status: 'Available',
    callDuration: '00:03:42',
    queueLength: '3',
    activeTickets: '1',
    variant: 'success'
  },
  {
    name: 'Alok Kumar',
    img: team4,
    email: 'kumaralok50@gmail.com',
    status: 'Break',
    callDuration: '00:02:42',
    queueLength: '8',
    activeTickets: '2',
    variant: 'warning'
  },
  {
    name: 'Kumar Aashish',
    img: team5,
    email: 'ashish123@gmail.com',
    status: 'Available',
    callDuration: '00:03:42',
    queueLength: '3',
    activeTickets: '1',
    variant: 'success'
  },
  {
    name: 'Neha Sharma',
    img: team1,
    email: 'nehasharma50@gmail.com',
    status: 'On Call',
    callDuration: '00:08:42',
    queueLength: '3',
    activeTickets: '1',
    variant: 'primary'
  },
  {
    name: 'Pallavi Singh',
    img: team1,
    email: 'singh80@gmail.com',
    status: 'On Call',
    callDuration: '00:08:42',
    queueLength: '3',
    activeTickets: '1',
    variant: 'primary'
  },
];

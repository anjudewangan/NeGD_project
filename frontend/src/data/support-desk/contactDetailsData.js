const timelineBadges = [
  { content: 'New', type: 'primary' },
  { content: 'Open', type: 'danger' },
  { content: 'Pending', type: 'warning' },
  { content: 'Escalated', type: 'info' },
  { content: 'Closed', type: 'success' }
];

export const timeline = [
  {
    ticketNo: 'TCK-1024',
    subject: 'Login - Unable to access DigiLocker account',
    description: 'User reports being unable to log in to DigiLocker. Forgot password feature did not send OTP.',
    time: '09:10 AM',
    icon: 'envelope',
    direction: 'in',
    sender: 'Customer',
    priority: { color: 'danger', text: 'Urgent' },
    status: timelineBadges[0],
    year: '2024',
    day: '15 May'
  },
  {
    ticketNo: 'TCK-1025',
    subject: 'Document - Marksheet not downloading',
    description: 'CBSE Class 10 marksheet not downloading from DigiLocker. System throws "Invalid Request" error.',
    time: '02:45 PM',
    icon: 'envelope',
    direction: 'in',
    sender: 'Customer',
    priority: { color: 'warning', text: 'High' },
    status: timelineBadges[3],
    year: '2024',
    day: '14 May'
  },
  {
    ticketNo: 'TCK-1026',
    subject: 'Support - Aadhaar not linking with DigiLocker',
    description: 'Aadhaar verification failed during DigiLocker setup. Requesting manual verification.',
    time: '11:25 AM',
    icon: 'envelope',
    direction: 'in',
    sender: 'Customer',
    priority: { color: 'danger', text: 'Urgent' },
    status: timelineBadges[0],
    year: '2024',
    day: '13 May'
  },
  {
    ticketNo: 'TCK-1027',
    subject: 'Password - Reset not working',
    description: 'Password reset option redirects back to login without any action or notification.',
    time: '08:10 AM',
    icon: 'envelope',
    direction: 'out',
    sender: 'Support Agent',
    priority: { color: 'primary', text: 'Medium' },
    status: timelineBadges[2],
    year: '2024',
    day: '12 May'
  },
  {
    ticketNo: 'TCK-1028',
    subject: 'Account - Mobile number update request',
    description: 'User submitted request to update the registered mobile number in DigiLocker.',
    time: '04:35 PM',
    icon: 'envelope',
    direction: 'in',
    sender: 'Customer',
    priority: { color: 'info', text: 'Low' },
    status: timelineBadges[4],
    year: '2024',
    day: '10 May'
  },
  {
    ticketNo: 'TCK-1029',
    subject: 'Support - UMANG app crash on launch',
    description: 'UMANG app closes immediately on Android 13 after update. User cannot access any services.',
    time: '10:15 AM',
    icon: 'envelope',
    direction: 'in',
    sender: 'Customer',
    priority: { color: 'danger', text: 'Urgent' },
    status: timelineBadges[0],
    year: '2024',
    day: '08 May'
  },
  {
    ticketNo: 'TCK-1030',
    subject: 'Service - Certificate not visible in UMANG',
    description: 'Vaccination certificate is not appearing in UMANG app even after successful login.',
    time: '01:50 PM',
    icon: 'envelope',
    direction: 'out',
    sender: 'Support Agent',
    priority: { color: 'warning', text: 'High' },
    status: timelineBadges[1],
    year: '2024',
    day: '07 May'
  },
  {
    ticketNo: 'TCK-1031',
    subject: 'Document - Unable to share DigiLocker files',
    description: 'User facing issue while sharing documents through email from DigiLocker platform.',
    time: '03:00 PM',
    icon: 'envelope',
    direction: 'in',
    sender: 'Customer',
    priority: { color: 'primary', text: 'Medium' },
    status: timelineBadges[3],
    year: '2024',
    day: '06 May'
  }
];

export const tickets = [
  {
    subject: 'Got a new television | Issue #377',
    status: timelineBadges[0],
    date: '25 September, 2022',
    priority: {
      title: 'Urgent',
      color: '#e63757',
      data: 100
    },
    agent: 'Anindya'
  },
  {
    subject: 'Subscription Issue | Issue #362',
    status: timelineBadges[4],
    date: '23 September, 2022',
    priority: {
      title: 'Low',
      color: '#00D27B',
      data: 25
    },
    agent: 'Khalid'
  },
  {
    subject: 'Received a broken TV | Issue #345',
    status: timelineBadges[0],
    date: '20 September, 2022',
    priority: {
      title: 'Urgent',
      color: '#e63757',
      data: 100
    },
    agent: 'Nowrin'
  },
  {
    subject: 'Payment failed | Issue #324',
    status: timelineBadges[4],
    date: '03 September, 2022',
    priority: {
      title: 'Medium',
      color: '#2A7BE4',
      data: 50
    },
    agent: 'Anindya'
  },
  {
    subject: 'Password change | Issue #234',
    status: timelineBadges[4],
    date: '24 August, 2022',
    priority: {
      title: 'Urgent',
      color: '#e63757',
      data: 100
    },
    agent: 'Nowrin'
  },
  {
    subject: 'Email Address change | Issue #202',
    status: timelineBadges[4],
    date: '20 August, 2022',
    priority: {
      title: 'Low',
      color: '#00D27B',
      data: 25
    },
    agent: 'Shajeeb'
  }
];

export const notes = [
  {
    title: 'Not able to access the system',
    description:
      "The PS4's hard drive is most likely the source of this CE-34335-8 safe mode error notice. Try these techniques to fix the hard drive issue if your PS4 won't start and won't let you access system storage because of error number CE-34335-8.",
    date: '28 Sep, 2020',
    time: '12:06 AM',
    agent: 'Anindya'
  },
  {
    title: 'No refund was requested',
    description:
      'It only takes a little while for a consumer to arrive on your door asking for a refund if you sell things online or in a physical store. And instead of closing that door all the way, think of a different approach.',
    date: '25 Sep, 2020',
    time: '03:18 PM',
    agent: 'Khalid'
  },
  {
    title: 'Use case for online ticket notes',
    description:
      'Using the inline ticket notes allows you to take notes while interacting with consumers. You may jot down notes while assisting a customer over live chat or over the phone, for instance. Aside from that.',
    date: '22 Sep, 2020',
    time: '10:21 AM',
    agent: 'Nowrin'
  },
  {
    title: 'Github Uploaded of the Conscious Administrator',
    description:
      'Are they really that dissimilar, even though those are mock-ups and this is politics? She may simply have my card, I believe.',
    date: '15 Sep, 2020',
    time: '12:21 PM',
    agent: 'Shajeeb'
  },
  {
    title: 'Selection of a design team',
    description:
      'One designer can make up a design team, as can a group of designers who take on various tasks and employ various techniques and tools to reach a single objective. The shared objective can be achieved by creating a website, a mobile application, or any other design project.',
    date: '11 Sep, 2020',
    time: '10:11 PM',
    agent: 'Anindya'
  },
  {
    title: 'Quickness of Reaction',
    description:
      'It has been designed particularly for WordPress, as opposed to other Frameworks which attempt to cover everything.',
    date: '09 Sep, 2020',
    time: '12:22 AM',
    agent: 'Shajeeb'
  },
  {
    title: 'Cultivate a design-oriented culture',
    description:
      'By teaching your designers to put the needs of the customer first and coordinating design objectives with corporate objectives, you can foster a culture of design strategy. Everything your design team does should be based on a design strategy.',
    date: '05 Sep, 2020',
    time: '10:21 AM',
    agent: 'Khalid'
  }
];

import course1 from 'assets/img/e-learning/courses/course1.png';
import course2 from 'assets/img/e-learning/courses/course2.png';
import course3 from 'assets/img/e-learning/courses/course3.png';
import course5 from 'assets/img/e-learning/courses/course5.png';
import course7 from 'assets/img/e-learning/courses/course7.png';
import course8 from 'assets/img/e-learning/courses/course8.png';

export const spendingsData = [85, 60, 120, 70, 100, 15, 65, 80, 60, 75, 45];

export const timeOnSiteData = [55, 60, 40, 120, 70, 80, 35, 80, 85];

export const assignmentScores = [
  {
    id: 0,
    range: 'Available',
    courses: 10,
    color: 'success',
    badge: {
      type: 'success',
      content: '2.1%',
      icon: 'caret-up'
    }
  },
  {
    id: 1,
    range: 'On Call',
    courses: 16,
    color: 'danger',
    badge: {
      type: 'danger',
      content: '5.1%',
      icon: 'caret-down'
    }
  },
  {
    id: 2,
    range: 'Busy',
    courses: 12,
    color: 'info',
    badge: {
      type: 'info',
      content: '5.0%',
      icon: 'caret-down'
    }
  },
  {
    id: 3,
    range: 'Break',
    courses: 2,
    color: 'warning',
    badge: {
      type: 'warning',
      content: '3.5%',
      icon: 'plus'
    }
  }
];

export const courseStatusData = [
  {
    id: 0,
    title: 'Closed Tickets',
    color: 'success',
    courses: 13,
    badge: {
      type: 'success',
      content: '2.1%',
      icon: 'caret-up'
    }
  },
  {
    id: 1,
    title: 'Open Tickets',
    color: 'danger',
    courses: 10,
    badge: {
      type: 'danger',
      content: '3.5%',
      icon: 'caret-up'
    }
  },
  {
    id: 2,
    title: 'Pending Tickets',
    color: 'warning',
    courses: 7,
    badge: {
      type: 'warning',
      content: '4.00%',
      icon: 'caret-down'
    }
  },
  {
    id: 3,
    title: 'Escalated Tickets',
    color: 'info',
    courses: 20,
    badge: {
      type: 'info',
      content: '5.1%',
      icon: 'caret-down'
    }
  }
];

export const payments = [
  {
    courseId: '123232',
    invoice: 'Ramesh Kumar',
    amount: '12 mins',
    email: 'ramesh123@gmail.com',
    phone: '+91 7896547896',
    language: 'Odia',
    date: '2025-05-18 11:15 AM',
    callType: 'Inbound',
    status: 'Pending',
    color: 'warning',
    issue: 'User unable to login – password reset'
  },
  {
    courseId: '147832',
    invoice: 'Anita Verma',
    amount: '6 mins',
    email: 'anita22@gmail.com',
    phone: '+91 9988547896',
    language: 'Telugu',
    date: '2025-05-18 10:32 AM',
    callType: 'Outbound',
    status: 'Closed',
    color: 'success',
    issue: 'Followed up for document upload issue'
  },
  {
    courseId: '965473',
    invoice: 'Mohan Das',
    amount: '8 mins',
    email: 'mohandas345@gmail.com',
    phone: '+91 9987400044',
    language: 'Hindi',
    date: '2025-05-18 03:25 PM',
    callType: 'Inbound',
    status: 'Escalated',
    color: 'info',
    issue: 'System error – forwarded to L2 team'
  },
  {
    courseId: '854763',
    invoice: 'Geeta Nair',
    amount: '10 mins',
    email: 'geeta00@gmail.com',
    phone: '+91 8854711223',
    language: 'English',
    date: '2025-05-18 02:10 PM',
    callType: 'Inbound',
    status: 'Escalated',
    color: 'info',
    issue: 'System error – forwarded to L2 team'
  },
  {
    courseId: '232645',
    invoice: 'Suresh Mehta',
    amount: '5 mins',
    email: 'suresh345@gmail.com',
    phone: '+91 9987400055',
    language: 'Marathi',
    date: '2025-05-18 12:45 PM',
    callType: 'Outbound',
    status: 'Closed',
    color: 'success',
    issue: 'Query about service downtime resolved'
  },
  {
    courseId: '232471',
    invoice: 'Neha Sen',
    amount: '11 mins',
    email: 'nehasen77@gmail.com',
    phone: '+91 8877990045',
    language: 'Tamil',
    date: '2025-05-18 10:32 AM',
    callType: 'Outbound',
    status: 'Closed',
    color: 'success',
    issue: 'Query about service downtime resolved'
  },
  {
    courseId: '232558',
    invoice: 'Deepak Varma',
    amount: '12 mins',
    email: 'deepak123@gmail.com',
    phone: '+91 7789650011',
    language: 'English',
    date: '2025-05-18 10:32 AM',
    callType: 'Outbound',
    status: 'Pending',
    color: 'warning',
    issue: 'Awaiting user confirmation on fix'
  }
];

export const recentActivities = [
  {
    id: 0,
    title: 'Logged out',
    description: 'Logged out from cart screen',
    time: '3h ago',
    icon: 'sign-out-alt'
  },
  {
    id: 1,
    title: 'Added ticket#123456 to cart',
    description: 'Added ticket to cart, Did not pay, Left cart',
    time: '3h ago',
    icon: 'plus'
  },
  {
    id: 2,
    title: 'Downloaded Materials of #121212',
    description: '3 pdf files were downloaded, learner completed 75% ',
    time: '3h ago',
    icon: 'download'
  },
  {
    id: 3,
    title: 'Sent a direct mail to Tra_bil37a8',
    description: 'Tra_bil37a8 is trainer of ticket#121212 ',
    time: '5h ago',
    icon: 'envelope'
  },
  {
    id: 4,
    title: 'Submitted ticket no.3',
    description: 'Assignment of ticket#121212 was due yesterday.',
    time: '5h ago',
    icon: 'file-upload'
  }
];

export const enrolledCoursesData = [
  {
    ticketNo: 'TCK-1000',
    reason: 'Agent Not Available',
    agentName: 'Aarav Sharma',
    complaintType: 'Billing Issue',
    breachTime: '15 mins late',
    status: { type: 'success', content: 'Closed', icon: ['fas', 'check-circle'] },
    slaType: 'Response',
    targetTime: '4 min',
    actualTime: '5 min',
    breached: 'Yes',
    date: '01/10/21'
  },
  {
    ticketNo: 'TCK-1001',
    reason: 'System Downtime',
    agentName: 'Ishita Patel',
    complaintType: 'Technical Issue',
    breachTime: '35 mins late',
    status: { type: 'warning', content: 'Pending', icon: ['fas', 'clock'] },
    slaType: 'Resolution',
    targetTime: '6 min',
    actualTime: '4 min',
    breached: 'No',
    date: '11/12/21'
  },
  {
    ticketNo: 'TCK-1002',
    reason: 'Escalation Hold',
    agentName: 'Rohan Mehra',
    complaintType: 'Service Delay',
    breachTime: '1 hr late',
    status: { type: 'danger', content: 'Open', icon: ['fas', 'exclamation-circle'] },
    slaType: 'Response',
    targetTime: '5 min',
    actualTime: '6 min',
    breached: 'Yes',
    date: '03/09/21'
  },
  {
    ticketNo: 'TCK-1003',
    reason: 'Agent Not Available',
    agentName: 'Sneha Kapoor',
    complaintType: 'Billing Issue',
    breachTime: '15 mins late',
    status: { type: 'success', content: 'Closed', icon: ['fas', 'check-circle'] },
    slaType: 'Resolution',
    targetTime: '8 min',
    actualTime: '7 min',
    breached: 'No',
    date: '31/12/21'
  },
  {
    ticketNo: 'TCK-1004',
    reason: 'System Downtime',
    agentName: 'Vikram Reddy',
    complaintType: 'Technical Issue',
    breachTime: '35 mins late',
    status: { type: 'info', content: 'Escalated', icon: ['fas', 'arrow-up'] },
    slaType: 'Response',
    targetTime: '3 min',
    actualTime: '6 min',
    breached: 'Yes',
    date: '31/08/21'
  },
  {
    ticketNo: 'TCK-1005',
    reason: 'Escalation Hold',
    agentName: 'Pooja Nair',
    complaintType: 'Service Delay',
    breachTime: '1 hr late',
    status: { type: 'info', content: 'Escalated', icon: ['fas', 'arrow-up'] },
    slaType: 'Resolution',
    targetTime: '5 min',
    actualTime: '5 min',
    breached: 'No',
    date: '14/05/21'
  },
  {
    ticketNo: 'TCK-1006',
    reason: 'Agent Not Available',
    agentName: 'Rajesh Kumar',
    complaintType: 'Billing Issue',
    breachTime: '15 mins late',
    status: { type: 'success', content: 'Closed', icon: ['fas', 'check-circle'] },
    slaType: 'Response',
    targetTime: '3 min',
    actualTime: '3 min',
    breached: 'No',
    date: '09/06/21'
  },
  {
    ticketNo: 'TCK-1007',
    reason: 'System Downtime',
    agentName: 'Divya Iyer',
    complaintType: 'Technical Issue',
    breachTime: '35 mins late',
    status: { type: 'success', content: 'Closed', icon: ['fas', 'check-circle'] },
    slaType: 'Resolution',
    targetTime: '4 min',
    actualTime: '4 min',
    breached: 'No',
    date: '09/06/21'
  }
];

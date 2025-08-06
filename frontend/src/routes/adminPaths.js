import paths, { rootPaths } from './paths';

export const dashboardRoutes = {
  label: 'Dashboard',
  labelDisable: true,
  children: [
    {
      name: 'Dashboard',
      to: '/dashboard',
      active: true,
      icon: 'chart-pie',
    }
  ]
};

export const documentationRoutes = {
  label: 'Management',
  children: [
    {
      name: 'Ticket Oversight',
      icon: 'ticket-alt',
      to: paths.ticketsTable,
      active: true,
    },
    {
      name: 'Live Monitoring',
      icon: 'poll',
      active: true,
      children: [
        {
          name: 'Oversight',
          to: paths.analytics,
          active: true
        },
        {
          name: 'Call Monitoring',
          active: true,
          to: paths.breadcrumbs,
        },
        {
          name: 'Chat Monitoring',
          active: true,
          to: paths.collapse,
        },
      ]
    },
    {
      name: 'Analytics',
      icon: 'chart-line',
      active: true,
      children: [
        {
          name: 'Team Performance',
          active: true,
          to: paths.projectManagement,
        },
        {
          name: 'Individual Performance',
          active: true,
          to: paths.advanceTables,
        },
      ]
    },
    {
      name: 'Shift Scheduling',
      icon: 'clock',
      active: true,
      children: [
        {
          name: 'View',
          to: paths.calendar,
          active: true
        },
        {
          name: 'Shift Edits',
          to: paths.calendarExample,
          active: true
        },
        {
          name: 'Approve Requests',
          to: paths.reports,
          active: true
        },
      ]
    },
  ]
};

export const appRoutes = {
  label: 'app',
  children: [
    {
      name: 'IVR',
      icon: 'phone',
      active: true,
      children: [
        {
          name: 'Live Call Panel',
          to: paths.configuration,
          active: true
        },
        {
          name: 'Call History',
          to: paths.changelog,
          active: true
        },
        {
          name: 'Outbound',
          to: paths.customers,
          active: true
        }
      ]
    },
    {
      name: 'Chat',
      icon: 'comments',
      active: true,
      children: [
        {
          name: 'Chat History',
          to: paths.chat,
          active: true
        },
        {
          name: 'Notes',
          to: paths.plugin,
          active: true
        },
      ]
    },
    {
      name: 'Email',
      icon: 'envelope-open',
      active: true,
      children: [
        {
          name: 'Inbox',
          to: paths.emailInbox,
          active: true
        },
      ]
    },
  ]
};

export const pagesRoutes = {
  label: 'Services',
  children: [
    {
      name: 'Escalations',
      icon: 'shapes',
      to: paths.kanban,
      active: true
    },
    {
      name: 'Training',
      icon: 'graduation-cap',
      to: paths.accordion,
      active: true
    },
    {
      name: 'Reports',
      icon: 'columns',
      active: true,
      children: [
        {
          name: 'Query & Complaint',
          active: true,
          to: paths.barCharts,
        },
        {
          name: 'SLA & Call Analytics',
          active: true,
          to: paths.lms,
        },
        {
          name: 'Call Volume Trend',
          active: true,
          to: paths.basicTables,
        },
        {
          name: 'Queue Analysis',
          active: true,
          to: paths.background,
        },
        {
          name: 'Agent Performance',
          active: true,
          to: paths.badges,
        },
      ]
    },
  ]
};

export const modulesRoutes = {
  label: 'Umang Caller',
  children: [
    {
      name: 'Ticket Vault',
      active: true,
      icon: 'ticket-alt',
      children: [
        {
          name: 'New Ticket',
          active: true,
          to: paths.formControl,
        },
        {
          name: 'Ticket List',
          active: true,
          to: paths.basicTables,
        }
      ]
    },
  ]
};



export default [
  dashboardRoutes,
  documentationRoutes,
  // appRoutes,
  pagesRoutes,
  // modulesRoutes
];

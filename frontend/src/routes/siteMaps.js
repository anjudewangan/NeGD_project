import paths, { rootPaths } from './paths';

export const dashboardRoutes = {
  label: 'Dashboard',
  labelDisable: true,
  children: [
    {
      name: 'Support Desk',
      to: paths.supportDesk,
      active: true,
      icon: 'chart-pie',
      // children: [
      //   {
      //     name: 'Admin',
      //     to: rootPaths.root,
      //     active: true
      //   },
      // ]
    }
  ]
};

export const documentationRoutes = {
  label: 'Management',
  children: [
    {
      name: 'Ticket Hub',
      icon: 'ticket-alt',
      active: true,
      children: [
        {
          name: 'My Tickets',
          to: paths.ticketsTable,
          active: true
        },
        {
          name: 'Create New Ticket',
          active: true,
          to: paths.formControl,
        },
      ]
    },
    {
      name: 'Reports',
      icon: 'poll',
      active: true,
      children: [
        {
          name: 'Performance',
          to: paths.reports,
          active: true
        },
        {
          name: 'Report Issue/Feedback',
          to: paths.floatingLabels,
          active: true
        },
      ]
    },
    {
      name: 'Tasks/Reminders',
      icon: 'clock',
      to: paths.kanban,
      active: true
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
        // {
        //   name: 'Email detail',
        //   to: paths.emailDetail,
        //   active: true
        // },
        // {
        //   name: 'Compose',
        //   to: paths.emailCompose,
        //   active: true
        // }
      ]
    },
  ]
};

export const pagesRoutes = {
  label: 'Services',
  children: [
    {
      name: 'Fetch Service Details',
      icon: 'wrench',
      to: paths.accordion,
      active: true
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
  appRoutes,
  pagesRoutes,
  // modulesRoutes
];

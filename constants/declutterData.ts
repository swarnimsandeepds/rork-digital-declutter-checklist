export interface DeclutterTask {
  id: string;
  title: string;
  description: string;
}

export interface DeclutterCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  tasks: DeclutterTask[];
}

export const DECLUTTER_CATEGORIES: DeclutterCategory[] = [
  {
    id: 'email',
    title: 'Email Inbox',
    icon: 'mail',
    color: '#7FB685',
    tasks: [
      {
        id: 'email-1',
        title: 'Unsubscribe from unwanted newsletters',
        description: 'Go through your inbox and unsubscribe from promotional emails you no longer read',
      },
      {
        id: 'email-2',
        title: 'Delete old emails',
        description: 'Archive or delete emails older than 6 months that you don\'t need',
      },
      {
        id: 'email-3',
        title: 'Create folders and labels',
        description: 'Set up an organizational system with folders or labels for different types of emails',
      },
      {
        id: 'email-4',
        title: 'Clear spam folder',
        description: 'Empty your spam and trash folders completely',
      },
      {
        id: 'email-5',
        title: 'Set up filters',
        description: 'Create email filters to automatically organize incoming messages',
      },
    ],
  },
  {
    id: 'social',
    title: 'Social Media',
    icon: 'users',
    color: '#E8A87C',
    tasks: [
      {
        id: 'social-1',
        title: 'Review friend/follower lists',
        description: 'Unfriend or unfollow accounts that no longer serve you',
      },
      {
        id: 'social-2',
        title: 'Delete old posts',
        description: 'Remove outdated or embarrassing posts from your profiles',
      },
      {
        id: 'social-3',
        title: 'Update profile information',
        description: 'Make sure your bio, photos, and contact info are current',
      },
      {
        id: 'social-4',
        title: 'Review privacy settings',
        description: 'Check and update privacy settings on all platforms',
      },
      {
        id: 'social-5',
        title: 'Leave inactive groups',
        description: 'Exit Facebook groups, Discord servers, or Slack workspaces you no longer use',
      },
    ],
  },
  {
    id: 'storage',
    title: 'Phone Storage',
    icon: 'smartphone',
    color: '#C38D9E',
    tasks: [
      {
        id: 'storage-1',
        title: 'Delete duplicate photos',
        description: 'Go through your camera roll and remove duplicate or blurry photos',
      },
      {
        id: 'storage-2',
        title: 'Clear old screenshots',
        description: 'Delete screenshots you no longer need',
      },
      {
        id: 'storage-3',
        title: 'Remove unused apps',
        description: 'Uninstall apps you haven\'t used in the last 3 months',
      },
      {
        id: 'storage-4',
        title: 'Clear app caches',
        description: 'Go through apps and clear their cached data',
      },
      {
        id: 'storage-5',
        title: 'Organize photos into albums',
        description: 'Create albums and organize your remaining photos',
      },
    ],
  },
  {
    id: 'subscriptions',
    title: 'Subscriptions',
    icon: 'credit-card',
    color: '#85A9C5',
    tasks: [
      {
        id: 'subscriptions-1',
        title: 'List all active subscriptions',
        description: 'Make a complete list of all your recurring subscriptions',
      },
      {
        id: 'subscriptions-2',
        title: 'Cancel unused subscriptions',
        description: 'Cancel services you no longer use or need',
      },
      {
        id: 'subscriptions-3',
        title: 'Review streaming services',
        description: 'Consider consolidating or rotating streaming platforms',
      },
      {
        id: 'subscriptions-4',
        title: 'Check for annual renewals',
        description: 'Set reminders for annual subscriptions before they auto-renew',
      },
    ],
  },
  {
    id: 'files',
    title: 'Files & Documents',
    icon: 'folder',
    color: '#B4A8B2',
    tasks: [
      {
        id: 'files-1',
        title: 'Organize Downloads folder',
        description: 'Sort through your downloads and delete or organize files',
      },
      {
        id: 'files-2',
        title: 'Delete duplicate files',
        description: 'Find and remove duplicate documents and files',
      },
      {
        id: 'files-3',
        title: 'Create folder structure',
        description: 'Set up a logical folder organization system',
      },
      {
        id: 'files-4',
        title: 'Clear Desktop',
        description: 'Organize or delete files cluttering your desktop',
      },
      {
        id: 'files-5',
        title: 'Backup important files',
        description: 'Make sure critical documents are backed up to cloud storage',
      },
    ],
  },
  {
    id: 'browser',
    title: 'Browser',
    icon: 'globe',
    color: '#E2C290',
    tasks: [
      {
        id: 'browser-1',
        title: 'Clear browsing history',
        description: 'Clear your browser history, cache, and cookies',
      },
      {
        id: 'browser-2',
        title: 'Organize bookmarks',
        description: 'Sort bookmarks into folders and delete outdated ones',
      },
      {
        id: 'browser-3',
        title: 'Remove unused extensions',
        description: 'Uninstall browser extensions you don\'t use',
      },
      {
        id: 'browser-4',
        title: 'Close old tabs',
        description: 'Close or bookmark tabs you\'ve had open for ages',
      },
      {
        id: 'browser-5',
        title: 'Update saved passwords',
        description: 'Review and update saved passwords, remove old accounts',
      },
    ],
  },
];

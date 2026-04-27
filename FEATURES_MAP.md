# StudySpark - Features Map & Branching Plan

## Completed Features ✅
- [x] **Tasks Page** - Full CRUD functionality for tasks with filtering and modal dialogs

### Core Features
1. **Dashboard Page** `feature/dashboard`
   - Task statistics (total, completed, pending)
   - Upcoming tasks overview
   - Subject summary cards
   - Today's progress indicator
   - Quick action buttons

2. **Today Page** `feature/today-view`
   - Display tasks due today
   - Quick mark complete functionality
   - Priority highlighting
   - Empty state when no tasks
   - Task status overview

3. **Subjects Management Page** `feature/subject-management`
   - Create new subjects
   - List all subjects
   - Edit subject names/details
   - Delete subjects
   - View tasks per subject
   - Subject statistics

4. **Settings Page** `feature/settings`
   - User preferences
   - Theme toggle persistence
   - Display settings (card view, list view)
   - Notification preferences
   - Data management (clear data, export)

### Data Persistence
5. **Local Storage Integration** `feature/local-storage-persistence`
   - Save tasks to localStorage
   - Save subjects to localStorage
   - Persist user settings/preferences
   - Load data on app startup

### Navigation & UI
6. **Navigation Refinement** `feature/navbar-enhancements`
   - Fix sidebar collapse/expand functionality
   - Add active route highlighting
   - Mobile menu support
   - Navigation animations

7. **Component Polish** `feature/component-refinement`
   - Ensure all components are fully styled
   - Test responsive design
   - Add loading states
   - Improve error handling

### Enhancement Features
8. **Task Filtering & Search** `feature/advanced-filtering`
   - Search by task title/description
   - Sort options (due date, priority, subject)
   - Advanced filtering combinations
   - Filter persistence

9. **Task Categories/Tags** `feature/task-tags`
   - Add tags/categories to tasks
   - Filter by tags
   - Multi-select tags
   - Tag management

10. **Notifications & Reminders** `feature/notifications-reminders`
    - Task due date notifications
    - Reminder alerts
    - Notification preferences
    - Sound/visual indicators

## Implementation Priority

**Phase 1 (Core):**
1. Local Storage Integration
2. Dashboard Page
3. Today Page
4. Subjects Management Page

**Phase 2 (Polish):**
5. Settings Page
6. Navigation Refinement
7. Component Polish

**Phase 3 (Enhancements):**
8. Task Filtering & Search
9. Task Categories/Tags
10. Notifications & Reminders

## Branch Naming Convention
- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-description`
- Refactoring: `refactor/description`
- Format: kebab-case

## Workflow
1. Create branch from `main`
2. Implement feature completely
3. Test thoroughly
4. Create PR and review
5. Merge to `main` after approval
6. Delete branch

## Notes
- All data currently stored in state (useState) - needs localStorage integration
- Components exist but need integration into pages
- Responsive design should be tested on each feature
- Type definitions may need expansion as features are added

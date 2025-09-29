# React Container–Presentational Pattern (Production-Level Notes)

## Overview
The **Container–Presentational pattern** separates components based on their responsibilities:

- **Container Components (Smart):** Handle data fetching, state management, and business logic.
- **Presentational Components (Dumb):** Focus solely on rendering UI using props and callbacks.

Benefits:
- Cleaner code organization and readability.
- Easier unit testing (pure UI vs. data logic).
- Improved reusability of presentational components.

---

## Folder Structure Example
src/
components/
UserCard/ # Presentational
index.tsx
styles.css
UserList/ # Presentational
index.tsx
containers/
UserContainer/ # Container
index.tsx


---

## Implementation Steps

### 1. Presentational Component
- Pure function.
- Receives all data via props.
- No direct API or global state.

```tsx
// components/UserCard/index.tsx
import React from 'react';

type UserCardProps = {
  name: string;
  email: string;
};

export const UserCard: React.FC<UserCardProps> = ({ name, email }) => (
  <div className="user-card">
    <h2>{name}</h2>
    <p>{email}</p>
  </div>
);
```
2. Container Component

Handles fetching and state.

Passes data/callbacks down.
// containers/UserContainer/index.tsx
```tsx
import React, { useEffect, useState } from 'react';
import { UserCard } from '../../components/UserCard';

type User = {
  id: number;
  name: string;
  email: string;
};

export const UserContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <div>
      {users.map((u) => (
        <UserCard key={u.id} name={u.name} email={u.email} />
      ))}
    </div>
  );
};
```

Production Tips

Keep Presentational components pure for easier snapshot testing.

Co-locate tests with components (__tests__ folder or *.test.tsx).

Use TypeScript interfaces/types for props.

Container components can be hooks (useUserData) + small wrappers.

Ideal for scaling large React apps and enforcing separation of concerns.

Interview Quick Points

Why use it? Better maintainability and testing.

Drawbacks? Might add boilerplate; not always needed for simple apps.

Modern React? Still relevant alongside hooks/context.

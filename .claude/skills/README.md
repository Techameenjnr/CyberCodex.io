# CyberCodex.io Development Agents

This directory contains specialized agents (skills) for Claude Code to assist with CyberCodex.io development. Each agent has specific expertise and responsibilities.

## Available Agents

### 1. Product Planner
**File**: `product-planner.md`
**Use when**: Planning features, creating roadmaps, scoping work

**Example invocations**:
- "As Product Planner, create a roadmap for Q1 2025"
- "Help me scope out the course system feature"
- "Break down the lab infrastructure into phases"

**Expertise**:
- Feature scoping and user stories
- MVP definition
- Technical feasibility assessment
- Success metrics and KPIs
- Dependency mapping

---

### 2. Component Librarian
**File**: `component-librarian.md`
**Use when**: Building or reviewing UI components

**Example invocations**:
- "As Component Librarian, create a Select component"
- "Review this Button component for consistency"
- "What components do we need for the course page?"

**Expertise**:
- Component architecture patterns (forwardRef, compound components)
- Design system enforcement (cyber theme)
- Accessibility in components
- Reusability and composability
- Tailwind v4 styling patterns

---

### 3. App Implementer
**File**: `app-implementer.md`
**Use when**: Building pages, routes, data flows, state management

**Example invocations**:
- "As App Implementer, create the course detail page"
- "Set up the MDX integration for course content"
- "Implement user authentication with NextAuth"

**Expertise**:
- Next.js App Router patterns
- Server/Client component patterns
- Data fetching strategies
- State management (Zustand, Context)
- API routes and route handlers
- Performance optimization

---

### 4. Content Architect
**File**: `content-architect.md`
**Use when**: Designing content structure, course frameworks, educational design

**Example invocations**:
- "As Content Architect, design the MDX frontmatter schema for courses"
- "Create a learning path for beginners"
- "Design the lab content template"

**Expertise**:
- Content metadata schemas
- Learning path design
- Educational principles
- MDX template creation
- Course/lab structure
- Progressive difficulty frameworks

---

### 5. Lab Orchestrator
**File**: `lab-orchestrator.md`
**Use when**: Building interactive lab environments

**Example invocations**:
- "As Lab Orchestrator, design the XSS lab environment"
- "Set up WebContainer integration for terminal labs"
- "Create a Docker-based vulnerable web app lab"

**Expertise**:
- Lab infrastructure (Docker, WebContainers, iframes)
- Sandboxing and isolation
- Flag validation systems
- Hints and progression
- Lab safety and security
- Challenge templates

---

### 6. Security & Accessibility
**File**: `security-accessibility.md`
**Use when**: Reviewing code for security/a11y, auditing, compliance

**Example invocations**:
- "As Security & Accessibility, audit the authentication system"
- "Review this component for WCAG compliance"
- "Check the API routes for security vulnerabilities"

**Expertise**:
- Security review (XSS, SQLi, CSRF, etc.)
- WCAG 2.1 AA accessibility
- Performance optimization
- Secure headers and CSP
- Input validation
- Rate limiting
- Lab sandboxing security

---

### 7. QA & Testsmith
**File**: `qa-testsmith.md`
**Use when**: Writing tests, setting up testing infrastructure, CI/CD

**Example invocations**:
- "As QA & Testsmith, write tests for the Button component"
- "Set up Playwright for E2E testing"
- "Create a GitHub Actions CI pipeline"

**Expertise**:
- Unit testing (Vitest)
- Integration testing
- E2E testing (Playwright)
- Test strategy and coverage
- CI/CD pipelines
- Code quality gates

---

## How to Use Agents

### Method 1: Direct Invocation
```
As [Agent Name], [task description]
```

Example:
```
As Component Librarian, create a Progress Bar component for tracking course completion
```

### Method 2: Consultation
```
I'm working on [feature]. Can [Agent Name] help with [specific aspect]?
```

Example:
```
I'm working on the course system. Can Content Architect help with the learning path structure?
```

### Method 3: Review Request
```
[Agent Name], please review [code/design/plan]
```

Example:
```
Security & Accessibility, please review this authentication implementation
```

## Agent Collaboration

Agents can work together on complex features:

### Example: Building Course System

1. **Product Planner**: Scope feature, create phases
2. **Content Architect**: Design course schema and metadata
3. **Component Librarian**: Build CourseCard, CourseList components
4. **App Implementer**: Create /courses pages and MDX integration
5. **Security & Accessibility**: Review for XSS, a11y compliance
6. **QA & Testsmith**: Write tests for all components

### Example: Creating Interactive Lab

1. **Product Planner**: Define MVP for lab system
2. **Lab Orchestrator**: Design lab infrastructure (Docker/WebContainer)
3. **Content Architect**: Create lab content template
4. **App Implementer**: Build lab pages and environment integration
5. **Security & Accessibility**: Audit sandboxing and isolation
6. **QA & Testsmith**: Write E2E tests for lab interaction

## Best Practices

1. **Be Specific**: Clearly state what you need from the agent
2. **Provide Context**: Reference CLAUDE.md for architecture context
3. **One Agent at a Time**: Focus on one perspective before switching
4. **Review Integration**: Check if agents' outputs work together
5. **Iterate**: Ask follow-up questions to refine solutions

## Agent Responsibilities Matrix

| Agent | Code | Tests | Docs | Design | Security | Planning |
|-------|------|-------|------|--------|----------|----------|
| Product Planner | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ |
| Component Librarian | ✅ | ⚠️ | ⚠️ | ✅ | ❌ | ❌ |
| App Implementer | ✅ | ⚠️ | ❌ | ❌ | ❌ | ❌ |
| Content Architect | ❌ | ❌ | ✅ | ✅ | ❌ | ⚠️ |
| Lab Orchestrator | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ❌ |
| Security & A11y | ⚠️ | ❌ | ❌ | ❌ | ✅ | ❌ |
| QA & Testsmith | ⚠️ | ✅ | ⚠️ | ❌ | ⚠️ | ❌ |

**Legend**:
- ✅ Primary responsibility
- ⚠️ Secondary / review responsibility
- ❌ Not responsible

## Quick Reference

**Need a new feature?** → Product Planner
**Need a UI component?** → Component Librarian
**Need a page/route?** → App Implementer
**Need content structure?** → Content Architect
**Need a lab environment?** → Lab Orchestrator
**Need security review?** → Security & Accessibility
**Need tests?** → QA & Testsmith

## Remember

- All agents have access to **CLAUDE.md** for architecture context
- Agents understand the **cyber theme** design system
- Agents know about **Tailwind v4** configuration
- Agents follow **CyberCodex.io** conventions and patterns
- Agents prioritize **security** (this is a hacking education platform!)
- Agents ensure **accessibility** for all learners

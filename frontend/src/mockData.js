/**
 * Mock data and simulator for AI Interview Practice.
 * Used when the FastAPI backend is not running.
 */

export const MOCK_QUESTIONS_BY_ROLE = {
  'Python Developer': {
    Easy: [
      'What is the difference between a list and a tuple in Python?',
      'How does Python handle memory management and garbage collection?',
      'What are Python decorators and how do you write a simple one?',
      'Explain the difference between deepcopy and shallow copy in Python.',
      'What is the purpose of the __init__ method in Python classes?'
    ],
    Medium: [
      'What is inheritance in Python, and how does multiple inheritance resolve method resolution order (MRO)?',
      'Explain how Python generators and the yield keyword work compared to standard iterators.',
      'How does the Global Interpreter Lock (GIL) affect multithreading in Python, and how can you bypass it?',
      'What are metaclasses in Python, and when would you use them in production code?',
      'Describe how context managers work and how you would implement one using the contextlib module.'
    ],
    Hard: [
      'How would you design a high-performance asynchronous data pipeline in Python using asyncio and uvloop?',
      'Explain how CPython compiles and interprets bytecode, including details on the evaluation loop and frame objects.',
      'How do you profile, detect, and resolve memory leaks in a long-running distributed Python service?',
      'Discuss descriptor protocol in Python (__get__, __set__, __delete__) and how it powers property and ORMs.',
      'How would you architect a fault-tolerant microservice in FastAPI with background workers and circuit breakers?'
    ]
  },
  'Java Developer': {
    Easy: [
      'What is the difference between JDK, JRE, and JVM?',
      'Explain the difference between equals() and == in Java.',
      'What is polymorphism in Java and how is it implemented?',
      'What are access modifiers in Java and what do they control?',
      'Explain the purpose of the final keyword in Java for variables, methods, and classes.'
    ],
    Medium: [
      'Explain how the Java Garbage Collector works and compare G1GC with ZGC.',
      'What is the difference between HashMap, ConcurrentHashMap, and HashTable in Java?',
      'How does the Java Memory Model (JMM) ensure thread safety with the volatile keyword?',
      'Describe the lifecycle of a Spring Boot bean and how dependency injection works under the hood.',
      'What are Java Streams, and how do parallel streams handle thread execution via ForkJoinPool?'
    ],
    Hard: [
      'How would you troubleshoot a high JVM CPU spike and OutOfMemoryError (OOM) in production?',
      'Explain ClassLoader hierarchy, parent delegation model, and how OSGi / hot swapping bypasses it.',
      'Design a distributed locking mechanism using Java and Redis Redlock algorithm.',
      'How do Virtual Threads (Project Loom) differ from platform threads in concurrency architecture?',
      'Explain bytecode manipulation using ByteBuddy or ASM and its application in Spring AOP proxies.'
    ]
  },
  'Frontend Developer': {
    Easy: [
      'What is the difference between let, const, and var in modern JavaScript?',
      'Explain the CSS Box Model and the effect of box-sizing: border-box.',
      'What are React hooks, and what rules must you follow when using them?',
      'Explain the difference between localStorage, sessionStorage, and cookies.',
      'What is the difference between synchronous and asynchronous operations in JavaScript?'
    ],
    Medium: [
      'Explain how React virtual DOM diffing and reconciliation work under the hood.',
      'What is Event Bubbling and Event Capturing, and how does event delegation leverage them?',
      'How do you optimize Core Web Vitals (LCP, FID/INP, CLS) in a modern web application?',
      'Compare server-side rendering (SSR), static site generation (SSG), and client-side rendering (CSR).',
      'How does the browser event loop handle the microtask queue versus the macrotask queue?'
    ],
    Hard: [
      'Design an enterprise-scale design system and component library with atomic design and tree-shaking.',
      'How would you architect an offline-first PWA with background sync and IndexedDB caching?',
      'Explain how modern bundlers (Vite, Rollup, Webpack) perform tree-shaking and code-splitting.',
      'Design a micro-frontend architecture using Webpack Module Federation or single-spa.',
      'How would you implement a high-performance 60fps canvas/webgl dashboard with thousands of real-time data points?'
    ]
  },
  'Backend Developer': {
    Easy: [
      'What is the difference between GET and POST HTTP methods?',
      'Explain the purpose of database indexes and when you should add them.',
      'What is REST and what are its key architectural principles?',
      'What is the difference between SQL and NoSQL databases?',
      'What is an API gateway and why is it useful?'
    ],
    Medium: [
      'How do you handle database connection pooling and prevent database starvation under high load?',
      'Explain database transaction isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable).',
      'How would you implement rate limiting in a distributed microservice architecture?',
      'Compare message queues (Kafka vs RabbitMQ) and discuss guaranteed delivery semantics (at-least-once, exactly-once).',
      'How do you handle zero-downtime database schema migrations for large datasets?'
    ],
    Hard: [
      'Architect a distributed idempotency key service for financial payments handling 50k requests/sec.',
      'Explain the CAP theorem and PACELC theorem and how they influence distributed database design.',
      'How would you design a distributed cache invalidation strategy across multi-region datacenters?',
      'Discuss consensus protocols (Raft, Paxos) and how distributed key-value stores maintain quorum.',
      'Design a resilient event-driven architecture using the Outbox pattern and Change Data Capture (CDC).'
    ]
  },
  'Full Stack Developer': {
    Easy: [
      'Explain the flow of a web request from browser URL input to backend database response.',
      'What is Cross-Origin Resource Sharing (CORS) and how do you resolve CORS errors?',
      'What is the purpose of JWT (JSON Web Tokens) in user authentication?',
      'Explain the difference between cookie-based authentication and token-based authentication.',
      'What are semantic HTML tags and why are they important for accessibility and SEO?'
    ],
    Medium: [
      'How do you secure a web app against XSS, CSRF, and SQL Injection attacks?',
      'Explain how WebSockets establish and maintain persistent full-duplex communication compared to SSE.',
      'How would you structure a modern monorepo with shared types, UI components, and API client contracts?',
      'Discuss state management strategies across frontend (Zustand/Redux/React Query) and backend sessions.',
      'How do you handle file uploads with presigned S3 URLs to reduce backend server load?'
    ],
    Hard: [
      'Design a full-stack real-time collaborative document editor like Google Docs using CRDTs or OT.',
      'Architect an end-to-end CI/CD pipeline with automated testing, blue-green deployments, and canary releases.',
      'How do you design a scalable full-text search infrastructure syncing PostgreSQL with Elasticsearch in real time?',
      'Discuss how to maintain zero data loss and consistency in an eventual-consistency microservice architecture.',
      'Architect a multi-tenant SaaS application with database tenant isolation, role-based access, and custom domains.'
    ]
  },
  'Data Analyst': {
    Easy: [
      'What is the difference between WHERE and HAVING clauses in SQL?',
      'Explain the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN.',
      'What are aggregate functions in SQL and how do they interact with GROUP BY?',
      'What is the difference between qualitative and quantitative data?',
      'How do you identify and handle missing or null values in a dataset?'
    ],
    Medium: [
      'Explain SQL Window functions (ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG) with realistic use cases.',
      'How do you design a Star Schema versus a Snowflake Schema in data warehousing?',
      'What metrics and statistical tests would you use to evaluate an A/B test result for statistical significance?',
      'Explain how you would detect and treat outliers in a skewed financial distribution.',
      'How do you build an automated ETL pipeline to monitor and alert on data quality anomalies?'
    ],
    Hard: [
      'Design a dimensional model for an omnichannel retail business with slowly changing dimensions (SCD Type 2).',
      'How do you calculate customer churn probability and cohort retention curves using SQL and Python?',
      'Explain how query planners optimize execution for multi-table joins on partitioned and clustered BigQuery tables.',
      'How do you measure and correct for selection bias and confounding variables in observational datasets?',
      'Design an executive KPI reporting framework with data lineage, governance, and automated anomaly detection.'
    ]
  },
  'C++ Developer': {
    Easy: [
      'What is the difference between pointers and references in C++?',
      'What is the purpose of the const keyword and const-correctness?',
      'Explain RAII (Resource Acquisition Is Initialization) in C++.',
      'What is the difference between stack allocation and heap allocation in C++?',
      'What are header guards and #pragma once used for?'
    ],
    Medium: [
      'Explain smart pointers in C++ (unique_ptr, shared_ptr, weak_ptr) and how they prevent memory leaks.',
      'What are rvalue references, std::move, and move semantics introduced in C++11?',
      'How does the virtual table (vtable) and vptr implement runtime polymorphism in C++?',
      'What is template specialization and SFINAE (Substitution Failure Is Not An Error)?',
      'Explain undefined behavior, memory alignment, and cache locality in performance-critical C++.'
    ],
    Hard: [
      'Explain the C++20 memory model, atomic operations, and memory ordering (acquire, release, seq_cst).',
      'Design a lock-free Single Producer Single Consumer (SPSC) circular ring buffer queue in C++.',
      'How do C++20 Concepts and Coroutines improve template metaprogramming and asynchronous I/O?',
      'Discuss cache-friendly data structures (Data-Oriented Design) versus classical Object-Oriented hierarchies.',
      'How would you debug a corrupted heap or data race using Valgrind, AddressSanitizer (ASan), and ThreadSanitizer?'
    ]
  },
  'Software Engineer': {
    Easy: [
      'What are the SOLID design principles in software engineering?',
      'Explain the difference between unit testing, integration testing, and end-to-end testing.',
      'What is version control and why is Git branching strategy important?',
      'What is the difference between an abstract class and an interface?',
      'What is Big-O notation and why is time/space complexity analysis essential?'
    ],
    Medium: [
      'Explain the Singleton, Factory, and Observer design patterns and when you would use each.',
      'How do you approach refactoring a monolithic legacy codebase without breaking existing functionality?',
      'Explain the difference between horizontal and vertical scaling and their respective bottlenecks.',
      'What is the purpose of database normalization, and when is intentional denormalization justified?',
      'How do you design an effective automated CI/CD pipeline with continuous monitoring and rollbacks?'
    ],
    Hard: [
      'Design a scalable distributed URL shortening service (like Bitly) supporting 1 billion links with sub-10ms latency.',
      'How do you handle distributed transactions across microservices using the Saga pattern (Choreography vs Orchestration)?',
      'Design a real-time notification service handling push, email, and SMS with fallback providers and rate limits.',
      'How do you architect a system for high availability (99.999% uptime) across multiple cloud regions?',
      'Explain how database sharding works, including consistent hashing, rebalancing, and cross-shard queries.'
    ]
  }
};

// Initial realistic interview history
export const INITIAL_MOCK_HISTORY = [
  {
    interview_id: 101,
    role: 'Python Developer',
    difficulty: 'Medium',
    number_of_questions: 5,
    score: 8.5,
    date: '2026-09-18 14:30'
  },
  {
    interview_id: 102,
    role: 'Frontend Developer',
    difficulty: 'Hard',
    number_of_questions: 5,
    score: 7.8,
    date: '2026-09-19 10:15'
  },
  {
    interview_id: 103,
    role: 'Software Engineer',
    difficulty: 'Medium',
    number_of_questions: 5,
    score: 9.0,
    date: '2026-09-20 11:00'
  }
];

// Helper to get questions for given role and difficulty
export function getQuestionsForSetup(role, difficulty, count = 5) {
  const roleQuestions = MOCK_QUESTIONS_BY_ROLE[role] || MOCK_QUESTIONS_BY_ROLE['Software Engineer'];
  const diffQuestions = roleQuestions[difficulty] || roleQuestions['Medium'];
  
  // Return requested count, cycling or generating if needed
  const selected = [];
  for (let i = 0; i < count; i++) {
    selected.push(diffQuestions[i % diffQuestions.length]);
  }
  return selected;
}

// In-memory active mock interview sessions
const mockActiveSessions = new Map();

export function mockStartInterview({ role, difficulty, number_of_questions }) {
  const interviewId = Math.floor(Math.random() * 900) + 100;
  const questions = getQuestionsForSetup(role, difficulty, number_of_questions);
  
  // Store session in memory
  mockActiveSessions.set(interviewId, {
    interview_id: interviewId,
    role,
    difficulty,
    number_of_questions: Number(number_of_questions),
    questions,
    currentIndex: 0,
    answers: [],
    date: new Date().toISOString().replace('T', ' ').slice(0, 16)
  });

  return {
    interview_id: interviewId,
    question_id: 1,
    question: questions[0]
  };
}

export function mockSubmitAnswer(interviewId, { question_id, answer }) {
  const session = mockActiveSessions.get(Number(interviewId)) || {
    interview_id: Number(interviewId),
    role: 'Software Engineer',
    difficulty: 'Medium',
    number_of_questions: 5,
    questions: getQuestionsForSetup('Software Engineer', 'Medium', 5),
    currentIndex: 0,
    answers: [],
    date: new Date().toISOString().replace('T', ' ').slice(0, 16)
  };

  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
  
  // Realistic scoring algorithm based on depth and clarity
  let score = 7;
  let feedback = 'Good explanation with relevant core concepts mentioned.';
  let strengths = ['Clear structured points', 'Accurate high-level definition'];
  let improvements = ['Could provide concrete code or architectural examples', 'Elaborate on edge cases and performance trade-offs'];

  if (wordCount < 15) {
    score = 5;
    feedback = 'Your answer is concise, but lacks technical depth and elaboration.';
    strengths = ['Direct answer to the prompt'];
    improvements = ['Explain the underlying mechanics in more detail', 'Mention practical industry scenarios'];
  } else if (wordCount > 60) {
    score = 9;
    feedback = 'Comprehensive answer demonstrating strong conceptual mastery and domain awareness.';
    strengths = ['In-depth technical explanation', 'Addressed nuances and trade-offs', 'Great clarity'];
    improvements = ['Keep concise when time-constrained in live interviews'];
  } else {
    score = 8;
    feedback = 'Solid explanation covering the essential mechanics and practical application.';
    strengths = ['Accurate conceptual understanding', 'Logical presentation of ideas'];
    improvements = ['Consider discussing common pitfalls or edge cases'];
  }

  session.answers.push({
    question_id,
    question: session.questions[session.currentIndex] || 'Interview Question',
    answer,
    score,
    feedback,
    strengths,
    improvements
  });

  session.currentIndex += 1;
  const isFinished = session.currentIndex >= session.number_of_questions;
  const next_question = isFinished ? null : session.questions[session.currentIndex];

  // If finished, persist in localStorage history
  if (isFinished) {
    saveCompletedSessionToHistory(session);
  } else {
    mockActiveSessions.set(session.interview_id, session);
  }

  return {
    score,
    feedback,
    strengths,
    improvements,
    next_question,
    next_question_id: isFinished ? null : session.currentIndex + 1
  };
}

export function mockGetInterview(interviewId) {
  const session = mockActiveSessions.get(Number(interviewId));
  if (!session) {
    return {
      interview_id: Number(interviewId),
      overall_score: 8.2,
      strengths: 'Strong fundamental knowledge, clear communication style, and structured reasoning.',
      improvements: 'Deepen knowledge of distributed systems edge cases and low-level memory implications.',
      recommendation: 'Recommended for Senior Technical Interviews. Ready for next round.'
    };
  }

  const scores = session.answers.map(a => a.score);
  const avg = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 8.0;

  return {
    interview_id: session.interview_id,
    role: session.role,
    difficulty: session.difficulty,
    number_of_questions: session.number_of_questions,
    overall_score: parseFloat(avg),
    strengths: 'Strong problem-solving foundation, accurate technical vocabulary, and logical reasoning.',
    improvements: 'Focus on discussing performance trade-offs, scaling limits, and monitoring practices.',
    recommendation: parseFloat(avg) >= 7.5 ? 'Strong Hire / Advance to Next Round' : 'Practice More on Advanced Scenarios',
    answers: session.answers
  };
}

function saveCompletedSessionToHistory(session) {
  try {
    const existing = JSON.parse(localStorage.getItem('ai_interview_history') || '[]');
    const scores = session.answers.map(a => a.score);
    const avg = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 8.0;
    
    const entry = {
      interview_id: session.interview_id,
      role: session.role,
      difficulty: session.difficulty,
      number_of_questions: session.number_of_questions,
      score: parseFloat(avg),
      date: session.date
    };
    
    existing.unshift(entry);
    localStorage.setItem('ai_interview_history', JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    console.warn('Could not save to localStorage', err);
  }
}

export function mockGetHistory() {
  try {
    const stored = JSON.parse(localStorage.getItem('ai_interview_history') || '[]');
    if (stored.length > 0) {
      return stored;
    }
  } catch (e) {
    // fallback
  }
  return INITIAL_MOCK_HISTORY;
}

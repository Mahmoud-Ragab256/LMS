import type { $ZodIssue } from "zod/v4/core";

class ZodError extends Error {
  public statusCode: number;
  public issues: { field: string, message: string }[];
  public status: 'fail' | 'error';


  public issuesMapping: (issues: $ZodIssue[]) => { field: string, message: string }[] = (issues: $ZodIssue[]) => {
    return issues.map((issue) => ({
      field: issue.path.join(),
      message: issue.message
    }));
  }

  constructor(statusCode: number, issues: $ZodIssue[]) {
    const message = "Validation Error"
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    const mappedIssues = this.issuesMapping(issues)
    this.issues = mappedIssues;
  }
}

export default ZodError;
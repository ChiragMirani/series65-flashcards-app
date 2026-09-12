import type { Snapshot, Card } from './model';
// Future contracts only. No payment, authentication, or cloud feature is implemented.
export interface Account { id:string; email:string }
export interface AuthPort { currentAccount():Promise<Account|null>; signOut():Promise<void> }
export interface Entitlement { accountId:string; product:'series65-12-month'; startsAt:string; expiresAt:string; status:'active'|'expired'|'revoked' }
export interface EntitlementPort { get(accountId:string):Promise<Entitlement|null> }
export interface SyncPort { push(accountId:string,snapshot:Snapshot,baseRevision:number):Promise<number>; pull(accountId:string):Promise<Snapshot|null> }
export interface CheckoutPort { createSession(accountId:string,coupon?:string):Promise<{url:string}> }
export interface ExamConceptMiss { examId:string; questionId:string; ruleIds:Card['ruleId'][]; confidence:'knew'|'narrowed'|'guessed' }

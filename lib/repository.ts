import { openDB, type IDBPDatabase } from 'idb';
import { emptySnapshot, snapshotSchema, type Card, type Snapshot } from './model';
import { reduceSnapshot, type Command } from './engine';
export interface StudyRepository {
  read(): Promise<Snapshot>;
  execute(command: Command): Promise<Snapshot>;
  close(): void;
}
export class IndexedDbStudyRepository implements StudyRepository {
  private db: Promise<IDBPDatabase>;
  constructor(private cards:Card[], name='series65-review-v1') {
    this.db=openDB(name,1,{upgrade(db){db.createObjectStore('study');}});
  }
  async read(): Promise<Snapshot> {
    const raw:unknown=await (await this.db).get('study','snapshot');
    return raw === undefined ? emptySnapshot() : snapshotSchema.parse(raw);
  }
  async execute(command:Command): Promise<Snapshot> {
    const db=await this.db;
    const tx=db.transaction('study','readwrite');
    try {
      const raw:unknown=await tx.store.get('snapshot');
      const state=raw===undefined?emptySnapshot():snapshotSchema.parse(raw);
      const next=snapshotSchema.parse(reduceSnapshot(state,command,this.cards));
      await tx.store.put(next,'snapshot');
      await tx.done;
      return next;
    } catch(error) { tx.abort(); await tx.done.catch(()=>undefined); throw error; }
  }
  close() { void this.db.then(db=>db.close()); }
}

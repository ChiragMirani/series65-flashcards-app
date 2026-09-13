import { categories, type Category } from './model';

export type StudyOrder = 'random' | 'scheduled';
export function selectionFromSearch(search:string):{category?:Category;mode:StudyOrder}|null {
  const params=new URLSearchParams(search);
  const subject=params.get('subject');
  const order=params.get('order')??'shuffle';
  if(!subject || (subject!=='all'&&!Object.hasOwn(categories,subject)) || !['shuffle','sequential'].includes(order)) return null;
  return {category:subject==='all'?undefined:subject as Category,mode:order==='shuffle'?'random':'scheduled'};
}
export function studyLink(origin:string,path:string,category:Category|undefined,mode:StudyOrder):string {
  const url=new URL(path,origin);
  url.searchParams.set('subject',category??'all');
  url.searchParams.set('order',mode==='random'?'shuffle':'sequential');
  return url.href;
}

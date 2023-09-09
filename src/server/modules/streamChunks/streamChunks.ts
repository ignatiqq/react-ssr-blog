import { ResponseManagersType } from '@server/types';
import { Response } from 'express';


export async function streamChunks(managers: ResponseManagersType) {
	// stream all rendered (not suspened) react chunks

	// начинаю стримить (тут мог быть хед) возможно исправлю
	// nodejs поток начинает читать managers.responseStream поток, в который мы будем
	// пушить дату из managers.taskManagers тасок
	// {{ managers.responseStream.pipe(res) }}

	managers.taskManager.processQueue();

	// рендерим реакт (пушим все htmlины из тасок в респонс стрим,
	// а ноджс респонс поток читает и отправляет их клиету)

	// ТРЮК ТОГО, что нода отправит все отложенные промисы и отрендерит все фолбеки
	// до закрытия запроса в том, что у нас есть отложенный промис в
	// onAllReady (метод у renderToPipeabledStream, который отработает только после рендера всех фолбеков)
	// и как только мы телепортируем все промисы и отредерим все фолбеки на клиенте, заресолвится этот промис
	// и закроется стрим
	await managers.taskManager.closeQueue();

	// close id="root" div + body + html
	managers.responseStream.push('</div></body></html>');

	// close stream
	managers.responseStream.push(null);
}
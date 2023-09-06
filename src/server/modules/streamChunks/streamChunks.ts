import { ResponseManagersType } from '@server/types';
import { Response } from 'express';


export async function streamChunks(res: Response, managers: ResponseManagersType) {
	// stream all rendered (not suspened) react chunks

	// начинаю стримить (тут мог быть хед) возможно исправлю
	// nodejs поток начинает читать managers.responseStream поток, в который мы будем
	// пушить дату из managers.taskManagers тасок
	res.pipe(managers.responseStream);

	managers.taskManager.processQueue();

	// рендерим реакт (пушим все htmlины из тасок в респонс стрим,
	// а ноджс респонс поток читает и отправляет их клиету)
	await managers.taskManager.closeQueue();

	// насколько я понял мы не закрываем боди пока не выполним
	// все дефферд таски с <Await /> компонента
	// ->
	// а после каждого из их ресолва мы отправляем скрипт (до бади)
	// с ресолвом сериализованной даты
	// ->
	// после этого закрываем боди тег

	managers.taskManager.processQueue();
}
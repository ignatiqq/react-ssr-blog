import { ResponseManagersType } from '@server/types';
import { Response } from 'express';


export async function streamChunks(res: Response, managers: ResponseManagersType) {
	// stream all rendered (not suspened) react chunks

	// начинаю стримить (тут мог быть хед) возможно исправлю
	res.pipe(managers.responseStream);

	managers.taskManager.processQueue();

	// рендерим реакт
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
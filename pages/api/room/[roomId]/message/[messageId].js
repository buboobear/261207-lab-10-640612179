import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
    //read value from URL
    const rooms = readDB();
    const roomId = req.query.roomId;
    const messageId = req.query.messageId;
    const data_room = rooms.filter((element) => {
        return element.roomId == roomId;
    });
    if (data_room[0]) {
        const data_message = data_room[0].messages.filter((element) => {
            return element.messageId == messageId;
        });
        if (data_message[0]) {
            data_room[0].messages = data_room[0].messages.filter((element) => {
                return element.messageId !== messageId;
            });
            return res.status(200).json({ ok: true });
        } else {
            return res.status(404).json({
                ok: false,
                message: "Invalid message id",
            });
        }
    } else {
        return res.status(404).json({
            ok: false,
            message: "Invalid room id",
        });
    }
}

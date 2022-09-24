import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
    if (req.method === "GET") {
        const rooms = readDB();
        const roomId = req.query.roomId;
        const data = rooms.filter((element) => {
            return element.roomId == roomId;
        });
        if (data[0]) {
            return res.status(200).json({
                ok: true,
                messages: data[0].messages,
            });
        } else {
            return res.status(404).json({
                ok: false,
                message: "Invalid room id",
            });
        }
    } else if (req.method === "POST") {
        const newId = uuidv4();
        const rooms = readDB();
        const roomId = req.query.roomId;
        const text = req.body.text;
        const data = rooms.filter((element) => {
            return element.roomId == roomId;
        });
        if (data[0]) {
            if (typeof text !== "string" || text.length < 1) {
                return res
                    .status(400)
                    .json({ ok: false, message: "Invalid text input" });
            } else {
                const newpost = { messageId: newId, text: text };
                data[0].messages = [...data[0].messages, newpost];
                res.status(201).json({ ok: true, message: newpost });
            }
        } else {
            return res.status(404).json({
                ok: false,
                message: "Invalid room id",
            });
        }
    }
}

import { readDB } from "../../backendLibs/dbLib";

export default function roomRoute(req, res) {
    const rooms = readDB();
    const data = rooms.map((element) => {
        return {
            roomId: element.roomId,
            roomName: element.roomName,
        };
    });
    return res.json({
        ok: true,
        rooms: data,
    });
}

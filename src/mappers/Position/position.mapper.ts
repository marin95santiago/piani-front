import { Position } from "../../schemas/Position/position.schema";

export default function positionMapper(position: any | unknown): Position {
  return {
    code: position.code ?? '',
    description: position.description ?? '',
    permissionsAvailable: position.permissionsAvailable ?? ['']
  }
}

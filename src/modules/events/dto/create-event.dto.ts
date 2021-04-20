import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDto {
    @ApiProperty({example: 'Въезд на территорию', description: 'Название события'})
    readonly name: string;
    @ApiProperty({example: '', description: 'Идентификатор события в базе ERP'})
    readonly guid: string;
    @ApiProperty({example: 'Въезд', description: 'Тип события'})
    readonly typeEvent: string;
    @ApiProperty({example: '1', description: 'Приоритет'})
    readonly priority: number;
    @ApiProperty({example: 'true', description: 'Если true - событие будет отображено на доске'})
    readonly active: boolean;
}

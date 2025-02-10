import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class File extends Document {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true }) // ✅ Ensure path is required
  path: string;
}

export const FileSchema = SchemaFactory.createForClass(File);

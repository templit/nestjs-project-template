import { Injectable } from '@nestjs/common';

import { ExampleEntity } from '@app/entities';

import { ExampleRepository } from './example.repository';
import { IExampleInstanceModel, IExampleInstanceInputModel } from './data-models';

@Injectable()
export class CommonExampleService {
  constructor(private readonly exampleRepository: ExampleRepository) {}

  public async getExampleById(exampleId: number): Promise<IExampleInstanceModel> {
    const exampleInstance = await this.exampleRepository.getExampleById(exampleId);
    const exampleModel = this.convertInstanceToModel(exampleInstance);

    return exampleModel;
  }

  public async createExample(exampleInput: IExampleInstanceInputModel): Promise<IExampleInstanceModel> {
    let exampleInstance = this.exampleRepository.create();

    exampleInstance.data = exampleInput.data;

    exampleInstance = await this.exampleRepository.save(exampleInstance);

    const exampleModel = this.convertInstanceToModel(exampleInstance);

    return exampleModel;
  }

  public async updateExample(
    exampleId: number,
    exampleInput: IExampleInstanceInputModel,
  ): Promise<IExampleInstanceModel> {
    let exampleInstance = await this.exampleRepository.getExampleById(exampleId);

    exampleInstance.data = exampleInput.data;

    exampleInstance = await this.exampleRepository.save(exampleInstance);

    const exampleModel = this.convertInstanceToModel(exampleInstance);

    return exampleModel;
  }

  public async deleteExampleById(exampleId: number): Promise<boolean> {
    await this.exampleRepository.deleteExampleById(exampleId);

    return true;
  }

  private convertInstanceToModel(instance: ExampleEntity): IExampleInstanceModel {
    const model: IExampleInstanceModel = {
      id: instance.id,
      data: instance.data,
      createdAt: instance.createdAt,
      updatedAt: instance.updatedAt,
    };

    return model;
  }
}

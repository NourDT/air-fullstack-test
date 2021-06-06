/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type CreateAppointmentInput = {
  id?: string | null;
  candidateId: string;
  eventName: string;
  timezone?: string | null;
  date?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  duration?: number | null;
};

export type ModelAppointmentConditionInput = {
  candidateId?: ModelStringInput | null;
  eventName?: ModelStringInput | null;
  timezone?: ModelStringInput | null;
  date?: ModelStringInput | null;
  startTime?: ModelStringInput | null;
  endTime?: ModelStringInput | null;
  duration?: ModelIntInput | null;
  and?: Array<ModelAppointmentConditionInput | null> | null;
  or?: Array<ModelAppointmentConditionInput | null> | null;
  not?: ModelAppointmentConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type Appointment = {
  __typename: "Appointment";
  id: string;
  candidateId: string;
  eventName: string;
  timezone?: string | null;
  date?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  duration?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateAppointmentInput = {
  id: string;
  candidateId?: string | null;
  eventName?: string | null;
  timezone?: string | null;
  date?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  duration?: number | null;
};

export type DeleteAppointmentInput = {
  id: string;
};

export type ModelAppointmentFilterInput = {
  id?: ModelIDInput | null;
  candidateId?: ModelStringInput | null;
  eventName?: ModelStringInput | null;
  timezone?: ModelStringInput | null;
  date?: ModelStringInput | null;
  startTime?: ModelStringInput | null;
  endTime?: ModelStringInput | null;
  duration?: ModelIntInput | null;
  and?: Array<ModelAppointmentFilterInput | null> | null;
  or?: Array<ModelAppointmentFilterInput | null> | null;
  not?: ModelAppointmentFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelAppointmentConnection = {
  __typename: "ModelAppointmentConnection";
  items?: Array<Appointment | null> | null;
  nextToken?: string | null;
};

export type CreateAppointmentMutation = {
  __typename: "Appointment";
  id: string;
  candidateId: string;
  eventName: string;
  timezone?: string | null;
  date?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  duration?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateAppointmentMutation = {
  __typename: "Appointment";
  id: string;
  candidateId: string;
  eventName: string;
  timezone?: string | null;
  date?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  duration?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteAppointmentMutation = {
  __typename: "Appointment";
  id: string;
  candidateId: string;
  eventName: string;
  timezone?: string | null;
  date?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  duration?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type GetAppointmentQuery = {
  __typename: "Appointment";
  id: string;
  candidateId: string;
  eventName: string;
  timezone?: string | null;
  date?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  duration?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type ListAppointmentsQuery = {
  __typename: "ModelAppointmentConnection";
  items?: Array<{
    __typename: "Appointment";
    id: string;
    candidateId: string;
    eventName: string;
    timezone?: string | null;
    date?: string | null;
    startTime?: string | null;
    endTime?: string | null;
    duration?: number | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken?: string | null;
};

export type OnCreateAppointmentSubscription = {
  __typename: "Appointment";
  id: string;
  candidateId: string;
  eventName: string;
  timezone?: string | null;
  date?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  duration?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateAppointmentSubscription = {
  __typename: "Appointment";
  id: string;
  candidateId: string;
  eventName: string;
  timezone?: string | null;
  date?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  duration?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteAppointmentSubscription = {
  __typename: "Appointment";
  id: string;
  candidateId: string;
  eventName: string;
  timezone?: string | null;
  date?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  duration?: number | null;
  createdAt: string;
  updatedAt: string;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateAppointment(
    input: CreateAppointmentInput,
    condition?: ModelAppointmentConditionInput
  ): Promise<CreateAppointmentMutation> {
    const statement = `mutation CreateAppointment($input: CreateAppointmentInput!, $condition: ModelAppointmentConditionInput) {
        createAppointment(input: $input, condition: $condition) {
          __typename
          id
          candidateId
          eventName
          timezone
          date
          startTime
          endTime
          duration
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateAppointmentMutation>response.data.createAppointment;
  }
  async UpdateAppointment(
    input: UpdateAppointmentInput,
    condition?: ModelAppointmentConditionInput
  ): Promise<UpdateAppointmentMutation> {
    const statement = `mutation UpdateAppointment($input: UpdateAppointmentInput!, $condition: ModelAppointmentConditionInput) {
        updateAppointment(input: $input, condition: $condition) {
          __typename
          id
          candidateId
          eventName
          timezone
          date
          startTime
          endTime
          duration
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateAppointmentMutation>response.data.updateAppointment;
  }
  async DeleteAppointment(
    input: DeleteAppointmentInput,
    condition?: ModelAppointmentConditionInput
  ): Promise<DeleteAppointmentMutation> {
    const statement = `mutation DeleteAppointment($input: DeleteAppointmentInput!, $condition: ModelAppointmentConditionInput) {
        deleteAppointment(input: $input, condition: $condition) {
          __typename
          id
          candidateId
          eventName
          timezone
          date
          startTime
          endTime
          duration
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteAppointmentMutation>response.data.deleteAppointment;
  }
  async GetAppointment(id: string): Promise<GetAppointmentQuery> {
    const statement = `query GetAppointment($id: ID!) {
        getAppointment(id: $id) {
          __typename
          id
          candidateId
          eventName
          timezone
          date
          startTime
          endTime
          duration
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetAppointmentQuery>response.data.getAppointment;
  }
  async ListAppointments(
    filter?: ModelAppointmentFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListAppointmentsQuery> {
    const statement = `query ListAppointments($filter: ModelAppointmentFilterInput, $limit: Int, $nextToken: String) {
        listAppointments(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            candidateId
            eventName
            timezone
            date
            startTime
            endTime
            duration
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListAppointmentsQuery>response.data.listAppointments;
  }
  OnCreateAppointmentListener: Observable<
    SubscriptionResponse<OnCreateAppointmentSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateAppointment {
        onCreateAppointment {
          __typename
          id
          candidateId
          eventName
          timezone
          date
          startTime
          endTime
          duration
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateAppointmentSubscription>>;

  OnUpdateAppointmentListener: Observable<
    SubscriptionResponse<OnUpdateAppointmentSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateAppointment {
        onUpdateAppointment {
          __typename
          id
          candidateId
          eventName
          timezone
          date
          startTime
          endTime
          duration
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateAppointmentSubscription>>;

  OnDeleteAppointmentListener: Observable<
    SubscriptionResponse<OnDeleteAppointmentSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteAppointment {
        onDeleteAppointment {
          __typename
          id
          candidateId
          eventName
          timezone
          date
          startTime
          endTime
          duration
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteAppointmentSubscription>>;
}

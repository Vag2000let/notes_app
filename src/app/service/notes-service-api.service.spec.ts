import { TestBed } from '@angular/core/testing'

import { NotesApiService } from './notes-service-api.service'

describe('httpClient', () => {
  let service: NotesApiService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(NotesApiService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})

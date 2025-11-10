export interface ITourPackage {
      _id: string
      title: string
      slug: string
      description: string
      location: string
      costFrom: number
      startDate: string
      endDate: string
      departureLocation: string
      arrivalLocation: string
      maxGuest: number
      minAge: number
      images: string[]
      included: string[]
      excluded: string[]
      amenities: string[]
      tourPlan: string[]
      tourType: string
      division: string
      createdAt: string
      updatedAt: string
}

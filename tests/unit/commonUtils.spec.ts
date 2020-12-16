describe("commonUtils.ts", () => {
  describe("generateId", () => {
    beforeEach(() => {
      jest.resetModules();
    });

    it("should return 1,2,3 at first 3 calls of one type", () => {
      const { generateId } = require("../../src/utils/commonUtils");

      const idType = "contactId";

      const id1 = generateId(idType);
      const id2 = generateId(idType);
      const id3 = generateId(idType);

      expect(id1).toEqual(1);
      expect(id2).toEqual(2);
      expect(id3).toEqual(3);
    });

    it("should return different ids for different types", () => {
      const { generateId } = require("../../src/utils/commonUtils");

      const idType1 = "contactId";
      const idType2 = "attributeId";

      const id1 = generateId(idType1);
      const id2 = generateId(idType2);

      expect(id1).toEqual(1);
      expect(id2).toEqual(1);
    });

    it("should not return same order ids for different types", () => {
      const { generateId } = require("../../src/utils/commonUtils");

      const idType1 = "contactId";
      const idType2 = "attributeId";

      const id1 = generateId(idType1);
      const id2 = generateId(idType2);

      expect(id1).toEqual(1);
      expect(id2).not.toEqual(2);
    });
  });
});
